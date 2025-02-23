import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import AuthForm from '../components/auth/AuthForm';
import SocialAuth from '../components/auth/SocialAuth';
import SwitchAuthMode from '../components/auth/SwitchAuthMode';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, googleSignIn } = useAuth();

  return (
    <View style={styles.container}>
      <AuthForm 
        isLogin={isLogin} 
        signIn={signIn} 
        signUp={signUp} 
      />
      <SocialAuth googleSignIn={googleSignIn} />
      <SwitchAuthMode 
        isLogin={isLogin} 
        onToggle={() => setIsLogin(!isLogin)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
});

export default AuthScreen;
