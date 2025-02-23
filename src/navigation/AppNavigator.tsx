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
          tabBarShowLabel: false,
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
            tabBarIcon: ({color}) => <Text style={{color, fontSize: 24}}>🏠</Text>,
          }}
        />
        <Tab.Screen 
          name="Gacha" 
          component={GachaScreen}
          options={{
            tabBarIcon: ({color}) => <Text style={{color, fontSize: 24}}>🎲</Text>,
          }}
        />
        <Tab.Screen 
          name="Invest" 
          component={InvestScreen}
          options={{
            tabBarIcon: ({color}) => <Text style={{color, fontSize: 24}}>📈</Text>,
          }}
        />
        <Tab.Screen 
          name="Analysis" 
          component={AnalysisScreen}
          options={{
            tabBarIcon: ({color}) => <Text style={{color, fontSize: 24}}>📊</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 