import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigator from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';
import {AuthProvider, useAuth} from './src/contexts/AuthContext';
import LoadingScreen from './src/screens/LoadingScreen';
import {initializeApp, getApps} from '@react-native-firebase/app';
import {SWRProvider} from './src/api/swrConfig';
import Config from 'react-native-config';

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY || '',
  authDomain: Config.FIREBASE_AUTH_DOMAIN || '',
  projectId: Config.FIREBASE_PROJECT_ID || '',
  storageBucket: Config.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: Config.FIREBASE_APP_ID || '',
} as const;

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const AppContent = () => {
  const {loading, serverToken} = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {serverToken ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App(): React.JSX.Element {
  return (
    <SWRProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SWRProvider>
  );
}

export default App;
