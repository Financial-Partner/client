import React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform, Pressable} from 'react-native';
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
  const {signOut} = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出錯誤:', error);
    }
  };

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
});

export default SettingsScreen; 