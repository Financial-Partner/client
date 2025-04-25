import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../contexts/AuthContext';
import {useUserProfile} from '../api/userService';
import SetUp from '../screens/SetUp';
import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {user} = useAuth();
  const {user: userProfile, isLoading: isUserLoading} = useUserProfile();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkSetup = async () => {
      if (!user?.uid || isUserLoading) {return;}

      if (!userProfile?.character?.id) {
        setInitialRoute('SetUp');
      } else {
        setInitialRoute('MainTabs');
      }
    };
    checkSetup();
  }, [user, userProfile, isUserLoading]);

  if (!initialRoute || isUserLoading) {return null;}

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
    </Stack.Navigator>
  );
};

export default AppNavigator;
