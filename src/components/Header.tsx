import React from 'react';
import {View, Text, StyleSheet, Pressable, StatusBar, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  MainTabs: undefined;
  Bag: undefined;
  Settings: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Header = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Pressable 
        style={({pressed}) => [
          styles.settingsButton,
          pressed && styles.buttonPressed
        ]}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.icon}>⚙️</Text>
      </Pressable>
      
      <View style={styles.rightContainer}>
        <Pressable 
          style={({pressed}) => [
            styles.bagButton,
            pressed && styles.buttonPressed
          ]}
          onPress={() => {
            navigation.navigate('Bag');
          }}>
          <Text style={styles.icon}>🎒</Text>
        </Pressable>
        
        <View style={styles.moneyContainer}>
          <Text style={styles.moneyText}>💰 1,000,000</Text>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    backgroundColor: '#f0f0f0',
  },
  moneyContainer: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  moneyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    fontSize: 20,
  },
});

export default Header; 