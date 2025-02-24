import React from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';

import Layout from '../components/Layout';
import Mission from '../components/Mission';

type RootStackParamList = {
  Transaction: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;


const HomeScreen = () => {
  const missions = [
    {
      title: '輸入交易紀錄',
      amount: 1000,
      isCompleted: false,
    },
    {
      title: '添加額外收入',
      amount: 500,
      isCompleted: false,
    },
    {
      title: '設定預算',
      amount: 2000,
      isCompleted: true,
    },
    {
      title: '設定目標存款',
      amount: 3000,
      isCompleted: false,
    },
  ];
  const targetAmount = 10000;
  const currentAmount = 5000;

  const navigation = useNavigation<NavigationProp>();

  return (
    <Layout>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.characterImg}>
          <Text>
            main character
          </Text>
        </View>

        <View style={styles.progressBar}>
          <Progress.Bar progress={currentAmount / targetAmount} width={200} />
          <Text style={styles.progressText}>${currentAmount}/${targetAmount}</Text>
        </View>

        <View style={styles.missionContainer}>
          <Text style={styles.missionTitle}>每日任務</Text>
          {missions.map((mission, index) => (
            <Mission key={index} mission={mission} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate('Transaction');}}
        >
          <Text style={styles.buttonText}>新增交易紀錄</Text>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
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
});

export default HomeScreen;
