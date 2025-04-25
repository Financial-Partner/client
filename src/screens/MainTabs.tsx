import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../contexts/AuthContext';
import HomeScreen from './HomeScreen';
import BagScreen from './BagScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

// Move component definitions outside of MainTabs
const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="home" size={size} color={color} />
);

const PetIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="paw" size={size} color={color} />
);

const ProfileIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="account" size={size} color={color} />
);

const Header = ({monthlySaving}: {monthlySaving: string}) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>首頁</Text>
    <View style={styles.savingInfo}>
      <Text style={styles.savingText}>
        本月存錢目標：NT$ {parseInt(monthlySaving, 10).toLocaleString()}
      </Text>
    </View>
  </View>
);

const MainTabs = () => {
  const {user} = useAuth();
  const [monthlySaving, setMonthlySaving] = useState('0');

  useEffect(() => {
    const loadUserData = async () => {
      if (user?.uid) {
        try {
          const savedMonthlySaving = await AsyncStorage.getItem(
            `monthlySaving-${user.uid}`,
          );
          if (savedMonthlySaving) {
            setMonthlySaving(savedMonthlySaving);
            console.log('Loaded monthly saving:', savedMonthlySaving);
          } else {
            console.log('No monthly saving found');
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    };

    loadUserData();
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#666',
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
          tabBarIcon: ({color, size}) => <HomeIcon color={color} size={size} />,
          header: () => <Header monthlySaving={monthlySaving} />,
        }}
      />
      <Tab.Screen
        name="Pet"
        component={BagScreen}
        options={{
          tabBarLabel: '寵物',
          tabBarIcon: ({color, size}) => <PetIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: '設定',
          tabBarIcon: ({color, size}) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  savingInfo: {
    marginTop: 5,
  },
  savingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MainTabs;
