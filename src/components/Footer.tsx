import React from 'react';
import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type TabParamList = {
  Home: undefined;
  Gacha: undefined;
  Invest: undefined;
  Analysis: undefined;
};

type NavigationProp = BottomTabNavigationProp<TabParamList>;

const Footer = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const tabs = [
    {name: 'Home' as const, icon: '🏠', label: '首頁'},
    {name: 'Gacha' as const, icon: '🎲', label: '抽卡'},
    {name: 'Invest' as const, icon: '📈', label: '投資'},
    {name: 'Analysis' as const, icon: '📊', label: '分析'},
  ] as const;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          style={({pressed}) => [
            styles.tab,
            pressed && styles.tabPressed,
            route.name === tab.name && styles.tabActive,
          ]}
          onPress={() => navigation.navigate(tab.name)}>
          <Text style={styles.icon}>{tab.icon}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 8,
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabPressed: {
    backgroundColor: '#f0f0f0',
  },
  tabActive: {
    backgroundColor: '#f8f8f8',
  },
  icon: {
    fontSize: 24,
  },
});

export default Footer; 