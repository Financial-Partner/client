import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';

import Layout from '../components/Layout';
import Mission from '../components/Mission';
import {useUserProfile} from '../api/userService';
import {Dinosaur} from '../svg';
import {useMissions} from '../api/missionService';
import {useAppSelector} from '../store';

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
  const {user: userProfile} = useUserProfile();
  const [dinoImage, setDinoImage] = useState<ImageSourcePropType | null>(null);
  const {monthlySaving, currentSaving, selectedDino} = useAppSelector(
    state => state.settings,
  );
  const {missions} = useMissions();
  const navigation = useNavigation<NavigationProp>();
  const [greating, setGreating] = useState<string | null>(null);

  const greatings = useMemo(
    () => [
      '主人 ! 今天還沒填寫交易紀錄喔~',
      '加油 ! 距離目標還差一點點 !',
      '今天天氣很好呢~',
      '哇 ! 主人今天賺好多 ! 百萬富翁就是你 !',
      '好喜歡看到存款變胖胖的樣子呢～',
      '錢包又瘦了，趕緊存錢阿～',
      '一起慢慢變有錢的小恐龍吧🦖',
      '跌倒沒關係，主人我陪你一起再站起來！',
    ],
    [],
  );

  const randomizeGreating = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * greatings.length);
    setGreating(greatings[randomIndex]);
  }, [greatings]);

  useEffect(() => {
    randomizeGreating();
  }, [randomizeGreating]);

  useEffect(() => {
    if (selectedDino && dinoImages[selectedDino]) {
      setDinoImage(dinoImages[selectedDino]);
    }
  }, [selectedDino]);

  // Calculate progress percentage
  const progressPercentage = Math.min(
    (parseInt(currentSaving || '0', 10) / parseInt(monthlySaving || '0', 10)) *
      100,
    100,
  );

  return (
    <Layout>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.characterContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{greating}</Text>
          </View>
          {dinoImage ? (
            <Pressable onPress={randomizeGreating}>
              <Image source={dinoImage} style={styles.mainCharacter} />
            </Pressable>
          ) : (
            <Dinosaur height={200} width={200} style={styles.mainCharacter} />
          )}
        </View>

        <View style={styles.progressBar}>
          <Progress.Bar progress={progressPercentage / 100} width={200} />
          <Text style={styles.progressText}>
            NT$ {parseInt(currentSaving || '0', 10).toLocaleString()} / NT${' '}
            {parseInt(monthlySaving || '0', 10).toLocaleString()}
          </Text>
        </View>

        <View style={styles.missionContainer}>
          <Text style={styles.missionTitle}>任務清單</Text>
          {missions && missions.length > 0 ? (
            missions.map(mission => (
              <Mission
                key={mission.id}
                mission={mission}
                diamonds={userProfile?.wallet?.diamonds || 0}
              />
            ))
          ) : (
            <Text style={styles.noMissionsText}>目前沒有任務</Text>
          )}
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
    justifyContent: 'flex-start',
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
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  noMissionsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
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
