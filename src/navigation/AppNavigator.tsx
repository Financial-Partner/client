import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import GachaScreen from '../screens/GachaScreen';
import InvestScreen from '../screens/InvestScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import BagScreen from '../screens/BagScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TransactionScreen from '../screens/TransactionScreen';
import SetUp from '../screens/SetUp';

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
      <Tab.Screen name="TransactionScreen" component={TransactionScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {user} = useAuth();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkSetup = async () => {
      if (!user?.uid) {return;}
      const key = `setupDone-${user.uid}`;
      const setupDone = await AsyncStorage.getItem(key);
      setInitialRoute(setupDone === 'true' ? 'MainTabs' : 'SetUp');
    };
    checkSetup();
  }, [user]);

  if (!initialRoute) {return null;}

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SetUp" component={SetUp} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
