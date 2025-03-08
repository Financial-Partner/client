import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native'; // TouchableOpacity
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Layout from '../components/Layout';
import Mission from '../components/Mission';
import {useAuth} from '../contexts/AuthContext';
import {Dinosaur} from '../svg';

type RootStackParamList = {
  TransactionScreen: undefined;
};

const dinoImages: {[key: string]: any} = {
  blue_1: require('../assets/characters/blue_1.png'),
  blue_2: require('../assets/characters/blue_2.png'),
  green_1: require('../assets/characters/green_1.png'),
  green_2: require('../assets/characters/green_2.png'),
  green_3: require('../assets/characters/green_3.png'),
  main_character: require('../assets/characters/main_character.png'),
  pink_1: require('../assets/characters/pink_1.png'),
  yellow_1: require('../assets/characters/yellow_1.png'),
  yellow_2: require('../assets/characters/yellow_2.png'),
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const {user} = useAuth();
  const [dinoImage, setDinoImage] = useState(null);
  const missions = [
    {title: '輸入交易紀錄', amount: 1000, isCompleted: false},
    {title: '添加額外收入', amount: 500, isCompleted: false},
    {title: '設定預算', amount: 2000, isCompleted: true},
    {title: '設定目標存款', amount: 3000, isCompleted: false},
  ];
  const targetAmount = 10000;
  const currentAmount = 5000;

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const loadDino = async () => {
      if (!user?.uid) {return;}
      const key = `dino-${user.uid}`;
      const imageKey = await AsyncStorage.getItem(key);
      if (imageKey && dinoImages[imageKey]) {
        setDinoImage(dinoImages[imageKey]);
      }
    };
    loadDino();
  }, [user]);

  return (
    <Layout>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        {dinoImage ? (
          <Image
            source={dinoImage}
            style={[styles.mainCharacter, {width: 200, height: 200}]}
          />
        ) : (
          <View style={styles.characterImg}>
          <Text>main character</Text>
        </View> // fallback if no image
        )}

        <View style={styles.progressBar}>
          <Progress.Bar progress={currentAmount / targetAmount} width={200} />
          <Text style={styles.progressText}>
            ${currentAmount}/${targetAmount}
          </Text>
        </View>

        <View style={styles.missionContainer}>
          <Text style={styles.missionTitle}>每日任務</Text>
          {missions.map((mission, index) => (
            <Mission key={index} mission={mission} />
          ))}
        </View>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('TransactionScreen')}>
          <Text style={styles.buttonText}>新增交易紀錄</Text>
        </Pressable>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  characterImg: {
    width: 300,
    height: 350,
    backgroundColor: 'lightblue',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  missionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  missionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  progressText: {
    marginLeft: 10,
  },
  mainCharacter: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 'auto',
  },
});

export default HomeScreen;
