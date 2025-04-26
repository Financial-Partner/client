import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {colors} from '../theme/colors';
import {Diamond, BagIcon} from '../svg';
import {useUserProfile} from '../api/userService';

type RootStackParamList = {
  MainTabs: undefined;
  Bag: undefined;
  Settings: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const Header = () => {
  const navigation = useNavigation<NavigationProp>();
  const {diamonds} = useUserProfile();
  const isLoading = false;
  console.log('diamonds', diamonds);

  return (
    <View style={styles.container}>
      <Pressable
        style={({pressed}) => [
          styles.settingsButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.navigate('Settings')}>
        <Image
          source={require('../assets/icons/settings.png')}
          style={styles.icon}
        />
      </Pressable>

      <View style={styles.rightContainer}>
        <Pressable
          style={({pressed}) => [
            styles.bagButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => {
            navigation.navigate('Bag');
          }}>
          <BagIcon height={24} width={24} />
        </Pressable>

        <View style={styles.moneyContainer}>
          <Diamond height={16} width={16} />
          {isLoading ? (
            <Text style={styles.moneyText}>Loading...</Text>
          ) : (
            <Text style={styles.moneyText}>{formatNumber(diamonds)}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background,
    paddingTop: Platform.select({
      android: StatusBar.currentHeight,
      ios: 44, // iOS 的安全區域高度
    }),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
  },
  bagButton: {
    padding: 8,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: colors.pressedBackground,
  },
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.moneyBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  moneyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.diamond,
  },
});

export default Header;
