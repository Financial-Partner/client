import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import GachaScreen from '../screens/GachaScreen';
import InvestScreen from '../screens/InvestScreen';
import AnalysisScreen from '../screens/AnalysisScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
          },
        }}>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: '首頁',
            tabBarIcon: ({color}) => <Text style={{color}}>🏠</Text>,
          }}
        />
        <Tab.Screen 
          name="Gacha" 
          component={GachaScreen}
          options={{
            tabBarLabel: '抽卡',
            tabBarIcon: ({color}) => <Text style={{color}}>🎲</Text>,
          }}
        />
        <Tab.Screen 
          name="Invest" 
          component={InvestScreen}
          options={{
            tabBarLabel: '投資',
            tabBarIcon: ({color}) => <Text style={{color}}>📈</Text>,
          }}
        />
        <Tab.Screen 
          name="Analysis" 
          component={AnalysisScreen}
          options={{
            tabBarLabel: '分析',
            tabBarIcon: ({color}) => <Text style={{color}}>📊</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 