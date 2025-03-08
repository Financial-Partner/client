import React, {createContext, useState, useContext, useEffect} from 'react';
import {
  getAuth,
  FirebaseAuthTypes,
  firebase,
} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  token: string | null;
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
};

const auth = getAuth();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const skipAuth = Config.SKIP_AUTH === 'true';

  useEffect(() => {
    if (skipAuth) {
      setLoading(false);
      setToken('dummy-token-for-development');
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
        await AsyncStorage.setItem('userToken', idToken);
      } else {
        setToken(null);
        await AsyncStorage.removeItem('userToken');
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
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      await AsyncStorage.setItem('userToken', idToken);
    } catch (error: any) {
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
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      await AsyncStorage.setItem('userToken', idToken);
    } catch (error: any) {
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
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);

      const {accessToken} = await GoogleSignin.getTokens();

      if (!accessToken) {
        throw new Error('無法獲取 Google access token');
      }

      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.data?.idToken || null,
      );
      const userCredential = await auth.signInWithCredential(googleCredential);
      const firebaseToken = await userCredential.user.getIdToken();
      setToken(firebaseToken);
      await AsyncStorage.setItem('userToken', firebaseToken);
    } catch (error) {
      console.error('Google 登入錯誤:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('userToken');
      setToken(null);
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
      const {data: userInfo} = await GoogleSignin.signIn();

      if (userInfo?.user?.email !== user.email) {
        throw new Error('請使用相同的電子郵件地址');
      }

      const {accessToken} = await GoogleSignin.getTokens();

      if (!accessToken) {
        throw new Error('無法獲取 Google access token');
      }

      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        accessToken,
      );

      const result = await user.linkWithCredential(googleCredential);
      setUser(result.user);
    } catch (error: any) {
      console.error('Google 帳號連結錯誤:', error);
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
    } catch (error: any) {
      throw error;
    }
  };

  const contextValue = {
    user,
    loading,
    token,
    skipAuth,
    signIn: skipAuth ? async () => {} : signIn,
    signUp: skipAuth ? async () => {} : signUp,
    signOut: skipAuth ? async () => {} : signOut,
    googleSignIn: skipAuth ? async () => {} : googleSignIn,
    linkGoogleAccount: skipAuth ? async () => {} : linkGoogleAccount,
    updatePassword: skipAuth ? async () => {} : updatePassword,
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
