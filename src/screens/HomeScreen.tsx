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
import {getCharacterImage} from '../constants/characterImages';

type RootStackParamList = {
  TransactionScreen: undefined;
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

  useEffect(() => {
    if (selectedDino && getCharacterImage(selectedDino)) {
      setDinoImage(getCharacterImage(selectedDino));
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
