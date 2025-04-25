import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GachaScreen from '../screens/GachaScreen';
import InvestScreen from '../screens/InvestScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import BagScreen from '../screens/BagScreen';
import TransactionScreen from '../screens/TransactionScreen';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="TransactionScreen" component={TransactionScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
