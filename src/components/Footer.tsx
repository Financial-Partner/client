import React from 'react';
import {View, StyleSheet, Pressable, Platform, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {colors} from '../theme/colors';

type TabParamList = {
  Home: undefined;
  Gacha: undefined;
  Invest: undefined;
  Analysis: undefined;
};

type NavigationProp = BottomTabNavigationProp<TabParamList>;

const tabs = [
  {
    name: 'Home' as const,
    icon: require('../assets/icons/home.png'),
    activeIcon: require('../assets/icons/home-active.png'),
    label: '首頁',
  },
  {
    name: 'Gacha' as const,
    icon: require('../assets/icons/gacha.png'),
    activeIcon: require('../assets/icons/gacha-active.png'),
    label: '抽卡',
  },
  {
    name: 'Invest' as const,
    icon: require('../assets/icons/invest.png'),
    activeIcon: require('../assets/icons/invest-active.png'),
    label: '投資',
  },
  {
    name: 'Analysis' as const,
    icon: require('../assets/icons/analysis.png'),
    activeIcon: require('../assets/icons/analysis-active.png'),
    label: '分析',
  },
] as const;

const Footer = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          style={({pressed}) => [
            styles.tab,
            pressed && styles.tabPressed,
          ]}
          onPress={() => navigation.navigate(tab.name)}>
          <Image
            source={route.name === tab.name ? tab.activeIcon : tab.icon}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabPressed: {
    backgroundColor: colors.pressedBackground,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default Footer;
