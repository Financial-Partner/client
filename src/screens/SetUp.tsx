import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../contexts/AuthContext';
import Layout from '../components/Layout';
import {colors} from '../theme/colors';
import GoalSetting from '../components/setup/GoalSetting';
import PetSelection from '../components/setup/PetSelection';

type SetupStep = 'goal' | 'pet';

const SetUp = () => {
  const [currentStep, setCurrentStep] = useState<SetupStep>('goal');
  const [goal, setGoal] = useState('');
  const [selectedDino, setSelectedDino] = useState<any>(null);
  const navigation = useNavigation();
  const {user} = useAuth();

  const handleNext = async () => {
    if (currentStep === 'goal') {
      if (goal.trim().length > 0) {
        setCurrentStep('pet');
      }
    } else if (currentStep === 'pet') {
      if (selectedDino && user?.uid) {
        const key = `setupDone-${user.uid}`;
        await AsyncStorage.setItem(key, 'true');
        await AsyncStorage.setItem(`dino-${user.uid}`, selectedDino.imageKey);
        navigation.reset({
          index: 0,
          routes: [{name: 'MainTabs' as never}],
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'pet') {
      setCurrentStep('goal');
    }
  };

  const progressValue = currentStep === 'goal' ? 0.5 : 1.0;

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <View style={styles.content}>
          {currentStep === 'goal' ? (
            <GoalSetting goal={goal} onGoalChange={setGoal} />
          ) : (
            <PetSelection
              selectedDino={selectedDino}
              onDinoSelect={setSelectedDino}
            />
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Progress.Bar progress={progressValue} width={null} />
          <View style={styles.navButtonsContainer}>
            {currentStep === 'pet' && (
              <TouchableOpacity onPress={handleBack} style={styles.navButton}>
                <Text style={styles.navButtonText}>上一步</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
              <Text style={styles.navButtonText}>
                {currentStep === 'goal' ? '下一步' : '完成！'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    marginTop: 10,
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  navButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SetUp;
