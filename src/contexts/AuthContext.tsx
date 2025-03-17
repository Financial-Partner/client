import React, {createContext, useState, useContext, useEffect} from 'react';
import {
  getAuth,
  FirebaseAuthTypes,
  firebase,
} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {authService} from '../api/authService';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  token: string | null;
  serverToken: string | null;
  tokenExchangeError: string | null;
  skipAuth: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  linkGoogleAccount: () => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  retryTokenExchange: () => Promise<boolean>;
};

const auth = getAuth();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [serverToken, setServerToken] = useState<string | null>(null);
  const [tokenExchangeError, setTokenExchangeError] = useState<string | null>(
    null,
  );
  const skipAuth = Config.SKIP_AUTH === 'true';

  const exchangeFirebaseToken = async (firebaseToken: string) => {
    try {
      setTokenExchangeError(null);
      const response = await authService.exchangeToken(firebaseToken);

      await AsyncStorage.setItem('userToken', response.access_token);
      await AsyncStorage.setItem('refreshToken', response.refresh_token);

      setServerToken(response.access_token);

      return response;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || '與服務器連接失敗';
      setTokenExchangeError(errorMessage);
      console.error('Token 交換失敗:', error);

      setServerToken(null);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');

      throw error;
    }
  };

  const retryTokenExchange = async (): Promise<boolean> => {
    if (!user) {
      return false;
    }

    try {
      const firebaseToken = await user.getIdToken(true);
      setToken(firebaseToken);

      await exchangeFirebaseToken(firebaseToken);
      return true;
    } catch (error) {
      console.error('重試 token 交換失敗:', error);
      return false;
    }
  };

  useEffect(() => {
    if (skipAuth) {
      setLoading(false);
      setToken('dummy-token-for-development');
      setServerToken('dummy-server-token-for-development');
      return;
    }

    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    });

    const unsubscribe = auth.onAuthStateChanged(async userState => {
      setUser(userState);
      if (userState) {
        const idToken = await userState.getIdToken();
        setToken(idToken);

        try {
          await exchangeFirebaseToken(idToken);
        } catch (error) {
          console.error('自動 token 交換失敗:', error);
        }
      } else {
        setToken(null);
        setServerToken(null);
        setTokenExchangeError(null);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('refreshToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [skipAuth]);

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('請輸入電子郵件和密碼');
      }

      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password,
      );

      const firebaseToken = await userCredential.user.getIdToken();
      setToken(firebaseToken);

      await exchangeFirebaseToken(firebaseToken);
    } catch (error: any) {
      setServerToken(null);

      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('無效的電子郵件格式');
          case 'auth/user-not-found':
            throw new Error('找不到此用戶');
          case 'auth/wrong-password':
            throw new Error('密碼錯誤');
          case 'auth/too-many-requests':
            throw new Error('登入嘗試次數過多，請稍後再試');
          default:
            throw new Error('登入失敗，請稍後再試');
        }
      } else {
        throw error;
      }
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('請輸入電子郵件和密碼');
      }

      if (password.length < 6) {
        throw new Error('密碼長度至少需要6個字元');
      }

      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      const firebaseToken = await userCredential.user.getIdToken();
      setToken(firebaseToken);

      await exchangeFirebaseToken(firebaseToken);
    } catch (error: any) {
      setServerToken(null);

      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            throw new Error('此電子郵件已被使用');
          case 'auth/invalid-email':
            throw new Error('無效的電子郵件格式');
          case 'auth/operation-not-allowed':
            throw new Error('此登入方式尚未啟用');
          case 'auth/weak-password':
            throw new Error('密碼強度不足');
          default:
            throw new Error('註冊失敗，請稍後再試');
        }
      } else {
        throw error;
      }
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: any = await GoogleSignin.signIn();

      let idToken = null;
      if (userInfo && typeof userInfo === 'object') {
        idToken = userInfo.idToken || (userInfo.data && userInfo.data.idToken);
      }

      if (!idToken) {
        throw new Error('無法獲取 Google token');
      }

      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        idToken!,
      );
      const userCredential = await auth.signInWithCredential(googleCredential);

      const firebaseToken = await userCredential.user.getIdToken();
      setToken(firebaseToken);

      await exchangeFirebaseToken(firebaseToken);
    } catch (error: any) {
      setServerToken(null);

      console.error('Google 登入錯誤:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (serverToken) {
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (refreshToken) {
            await authService.logout(refreshToken);
          } else {
            console.warn('找不到 refresh_token 進行登出');
          }
        } catch (apiError) {
          console.error('API 登出失敗:', apiError);
        }
      }

      await auth.signOut();

      try {
        await GoogleSignin.signOut();
      } catch (googleError) {
        console.error('Google 登出錯誤:', googleError);
      }

      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');

      setToken(null);
      setServerToken(null);
      setTokenExchangeError(null);
    } catch (error) {
      throw error;
    }
  };

  const linkGoogleAccount = async () => {
    try {
      if (!user?.email) {
        throw new Error('找不到當前用戶信箱');
      }

      await GoogleSignin.hasPlayServices();
      const userInfo: any = await GoogleSignin.signIn();

      let idToken = null;
      let googleEmail = null;

      if (userInfo && typeof userInfo === 'object') {
        idToken = userInfo.idToken || (userInfo.data && userInfo.data.idToken);

        googleEmail =
          userInfo.user?.email ||
          (userInfo.data && userInfo.data.user && userInfo.data.user.email);
      }

      if (googleEmail && googleEmail !== user.email) {
        throw new Error('請使用相同的電子郵件地址');
      }

      if (!idToken) {
        throw new Error('無法獲取 Google token');
      }

      let accessToken = null;
      try {
        const tokens = await GoogleSignin.getTokens();
        accessToken = tokens.accessToken;
      } catch (error) {
        console.error('無法獲取 Google accessToken:', error);
      }

      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        idToken!,
        accessToken || undefined,
      );

      const result = await user.linkWithCredential(googleCredential);
      setUser(result.user);

      const firebaseToken = await result.user.getIdToken(true);
      setToken(firebaseToken);

      await exchangeFirebaseToken(firebaseToken);
    } catch (error: any) {
      console.error('Google 帳號連結錯誤:', error);

      if (error.code) {
        switch (error.code) {
          case 'auth/provider-already-linked':
            throw new Error('此 Google 帳號已經連結');
          case 'auth/credential-already-in-use':
            throw new Error('此 Google 帳號已被其他帳號使用');
          default:
            if (error.message) {
              throw error;
            }
            throw new Error('連結失敗，請稍後再試');
        }
      } else {
        throw error;
      }
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      if (!user) {
        throw new Error('用戶未登入');
      }
      await user.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(
          user.email!,
          currentPassword,
        ),
      );
      await user.updatePassword(newPassword);

      const firebaseToken = await user.getIdToken(true);
      setToken(firebaseToken);

      await exchangeFirebaseToken(firebaseToken);
    } catch (error: any) {
      throw error;
    }
  };

  const contextValue = {
    user,
    loading,
    token,
    serverToken,
    tokenExchangeError,
    skipAuth,
    signIn: skipAuth ? async () => {} : signIn,
    signUp: skipAuth ? async () => {} : signUp,
    signOut: skipAuth ? async () => {} : signOut,
    googleSignIn: skipAuth ? async () => {} : googleSignIn,
    linkGoogleAccount: skipAuth ? async () => {} : linkGoogleAccount,
    updatePassword: skipAuth ? async () => {} : updatePassword,
    retryTokenExchange,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
};
