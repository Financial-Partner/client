import React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../theme/colors';

type RootStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

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
        <Text style={styles.text}>設定內容</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
});

export default SettingsScreen; 