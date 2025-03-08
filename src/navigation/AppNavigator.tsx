import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import GachaScreen from '../screens/GachaScreen';
import InvestScreen from '../screens/InvestScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import BagScreen from '../screens/BagScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TransactionScreen from '../screens/TransactionScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {display: 'none'},
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Gacha" component={GachaScreen} />
      <Tab.Screen name="Invest" component={InvestScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="Bag" component={BagScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ presentation: 'modal',}}/>
      <Stack.Screen name="Transaction" component={TransactionScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
