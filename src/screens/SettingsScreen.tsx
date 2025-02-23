import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';
import { useAuth } from '../contexts/AuthContext';
import SettingsHeader from '../components/settings/SettingsHeader';
import AccountInfo from '../components/settings/AccountInfo';
import PasswordSection from '../components/settings/PasswordSection';
import LinkGoogleAccount from '../components/settings/LinkGoogleAccount';
import SignOutButton from '../components/settings/SignOutButton';
import UpdatePasswordModal from '../components/settings/UpdatePasswordModal';

type RootStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, signOut, linkGoogleAccount, updatePassword } = useAuth();
  const [linking, setLinking] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出錯誤:', error);
    }
  };

  const handleLinkGoogle = async () => {
    try {
      setLinking(true);
      await linkGoogleAccount();
      Alert.alert('成功', 'Google 帳號已成功連結');
    } catch (error: any) {
      Alert.alert('錯誤', error.message);
    } finally {
      setLinking(false);
    }
  };

  const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await updatePassword(currentPassword, newPassword);
      Alert.alert('成功', '密碼已更新');
    } catch (error: any) {
      throw error;
    }
  };

  const isPasswordLogin = user?.providerData.some(
    (provider) => provider.providerId === 'password'
  );

  const hasGoogleProvider = user?.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );

  const showLinkButton = isPasswordLogin && !hasGoogleProvider;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SettingsHeader onClose={() => navigation.goBack()} />
      <View style={styles.content}>
        <AccountInfo email={user?.email} />
        {isPasswordLogin && (
          <PasswordSection onPress={() => setShowPasswordModal(true)} />
        )}
        {showLinkButton && (
          <LinkGoogleAccount
            linking={linking}
            onLink={handleLinkGoogle}
            email={user?.email}
          />
        )}
        <SignOutButton onPress={handleSignOut} />
      </View>
      <UpdatePasswordModal
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handleUpdatePassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsScreen;
