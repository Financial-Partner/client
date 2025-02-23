import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Platform, Pressable, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../theme/colors';
import {useAuth} from '../contexts/AuthContext';

type RootStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {user, signOut, linkGoogleAccount} = useAuth();
  const [linking, setLinking] = useState(false);

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

  const isEmailProvider = user?.providerData.some(
    provider => provider.providerId === 'password',
  );

  const hasGoogleProvider = user?.providerData.some(
    provider => provider.providerId === 'google.com',
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.header}>
        <Pressable
          style={({pressed}) => [
            styles.closeButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>關閉</Text>
        </Pressable>
        <Text style={styles.title}>設定</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>電子郵件</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {isEmailProvider && !hasGoogleProvider && (
          <View style={styles.linkSection}>
            <Text style={styles.sectionTitle}>連結其他登入方式</Text>
            <Pressable
              style={({pressed}) => [
                styles.linkButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleLinkGoogle}
              disabled={linking}>
              {linking ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.linkText}>連結 Google 帳號</Text>
              )}
            </Pressable>
            <Text style={styles.linkHint}>
              * 請使用相同的電子郵件地址 ({user?.email})
            </Text>
          </View>
        )}

        <Pressable
          style={({pressed}) => [
            styles.signOutButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignOut}>
          <Text style={styles.signOutText}>登出</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.select({
      android: StatusBar.currentHeight,
      ios: 44,
    }),
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: colors.pressedBackground,
  },
  closeText: {
    fontSize: 16,
    color: colors.text,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  signOutButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.text,
  },
  linkSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  linkButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SettingsScreen; 