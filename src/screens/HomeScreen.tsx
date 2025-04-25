import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  ImageSourcePropType,
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

const dinoImages: {[key: string]: ImageSourcePropType} = {
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
  const [dinoImage, setDinoImage] = useState<ImageSourcePropType | null>(null);
  const [monthlySaving, setMonthlySaving] = useState('0');
  const [currentSaving, setCurrentSaving] = useState('0');

  const missions = [
    {title: '輸入交易紀錄', amount: 1000, isCompleted: false},
    {title: '添加額外收入', amount: 500, isCompleted: false},
    {title: '設定預算', amount: 2000, isCompleted: true},
    {title: '設定目標存款', amount: 3000, isCompleted: false},
  ];

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const loadUserData = async () => {
      if (!user?.uid) {
        return;
      }

      // Load dino image
      const key = `dino-${user.uid}`;
      const imageKey = await AsyncStorage.getItem(key);
      if (imageKey && dinoImages[imageKey]) {
        setDinoImage(dinoImages[imageKey]);
      }

      // Load monthly saving target
      const savedMonthlySaving = await AsyncStorage.getItem(
        `monthlySaving-${user.uid}`,
      );
      if (savedMonthlySaving) {
        setMonthlySaving(savedMonthlySaving);
        console.log('Loaded monthly saving:', savedMonthlySaving);
      }

      // Load current saving
      const savedCurrentSaving = await AsyncStorage.getItem(
        `currentSaving-${user.uid}`,
      );
      if (savedCurrentSaving) {
        setCurrentSaving(savedCurrentSaving);
      } else {
        setCurrentSaving('0');
      }
    };

    loadUserData();
  }, [user]);

  // Calculate progress percentage
  const progressPercentage = Math.min(
    (parseInt(currentSaving, 10) / parseInt(monthlySaving, 10)) * 100,
    100,
  );

  return (
    <Layout>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.characterContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>一起往目標前進吧！</Text>
          </View>
          {dinoImage ? (
            <Image source={dinoImage} style={styles.mainCharacter} />
          ) : (
            <Dinosaur height={200} width={200} style={styles.mainCharacter} />
          )}
        </View>

        <View style={styles.progressBar}>
          <Progress.Bar progress={progressPercentage / 100} width={200} />
          <Text style={styles.progressText}>
            NT$ {parseInt(currentSaving, 10).toLocaleString()} / NT${' '}
            {parseInt(monthlySaving, 10).toLocaleString()}
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
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
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
    alignSelf: 'flex-start',
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
  speechBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  speechText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;
