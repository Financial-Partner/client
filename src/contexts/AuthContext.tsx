import React, {createContext, useState, useContext, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    });

    const unsubscribe = auth().onAuthStateChanged(async userState => {
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
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      await AsyncStorage.setItem('userToken', idToken);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
      await AsyncStorage.setItem('userToken', idToken);
    } catch (error) {
      throw error;
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

      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken || null);
      const userCredential = await auth().signInWithCredential(googleCredential);
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
      await auth().signOut();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('userToken');
      setToken(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        signIn,
        signUp,
        signOut,
        googleSignIn
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
};
