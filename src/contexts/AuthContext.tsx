import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {
  getAuth,
  FirebaseAuthTypes,
  firebase,
} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {authService} from '../api/authService';
import {useAppDispatch, useAppSelector} from '../store';
import {setTokens, clearTokens} from '../store/slices/authSlice';
import {store} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const {userToken, refreshToken} = useAppSelector(state => state.auth);

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [serverToken, setServerToken] = useState<string | null>(userToken);
  const [tokenExchangeError, setTokenExchangeError] = useState<string | null>(
    null,
  );
  const skipAuth = Config.SKIP_AUTH === 'true';

  const refreshAccessToken = useCallback(
    async (_: string) => {
      try {
        if (!refreshToken) {
          return false;
        }

        setTokenExchangeError(null);
        const response = await authService.refreshToken(refreshToken);

        dispatch(
          setTokens({
            userToken: response.access_token,
            refreshToken: response.refresh_token,
          }),
        );

        setServerToken(response.access_token);
        return true;
      } catch (error: any) {
        console.error('刷新 token 失敗:', error);
        setTokenExchangeError('刷新 token 失敗，請重新登入');
        setServerToken(null);
        dispatch(clearTokens());
        return false;
      }
    },
    [dispatch, refreshToken],
  );

  const exchangeFirebaseToken = useCallback(
    async (firebaseToken: string) => {
      try {
        setTokenExchangeError(null);
        const response = await authService.exchangeToken(firebaseToken);

        dispatch(
          setTokens({
            userToken: response.access_token,
            refreshToken: response.refresh_token,
          }),
        );

        setServerToken(response.access_token);

        return response;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || '與服務器連接失敗';
        setTokenExchangeError(errorMessage);
        console.error('Token 交換失敗:', error);

        setServerToken(null);
        dispatch(clearTokens());

        throw error;
      }
    },
    [dispatch],
  );

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
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          await exchangeFirebaseToken(storedToken);
          await refreshAccessToken(storedToken);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch, exchangeFirebaseToken, refreshAccessToken]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setUser(user);
      if (user) {
        try {
          const firebaseToken = await user.getIdToken();
          setToken(firebaseToken);
          await exchangeFirebaseToken(firebaseToken);
        } catch (error) {
          console.error('Error getting Firebase token:', error);
        }
      } else {
        setToken(null);
        setServerToken(null);
      }
    });

    return () => unsubscribe();
  }, [exchangeFirebaseToken]);

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
          const state = store.getState();
          const currentRefreshToken = state.auth.refreshToken;
          if (currentRefreshToken) {
            await authService.logout(currentRefreshToken);
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

      dispatch(clearTokens());

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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
