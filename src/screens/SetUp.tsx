import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../contexts/AuthContext';
import Layout from '../components/Layout';
import {colors} from '../theme/colors';

const SetUp = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const navigation = useNavigation();
  const {user} = useAuth();

  // Mock data for pet images
  const pets = [
    {
      id: 1,
      name: '寵物 1',
      image: {
        uri: 'https://www.comfortzone.com/-/media/project/oneweb/comfortzone/images/blog/how-can-i-soothe-and-calm-my-cat.jpeg?h=717&iar=0&w=1000&hash=4B47BC0AD485430E429977C30A7A37DF',
      },
    },
    {
      id: 2,
      name: '寵物 2',
      image: {
        uri: 'https://www.comfortzone.com/-/media/project/oneweb/comfortzone/images/blog/how-can-i-soothe-and-calm-my-cat.jpeg?h=717&iar=0&w=1000&hash=4B47BC0AD485430E429977C30A7A37DF',
      },
    },
    {
      id: 3,
      name: '寵物 3',
      image: {
        uri: 'https://www.comfortzone.com/-/media/project/oneweb/comfortzone/images/blog/how-can-i-soothe-and-calm-my-cat.jpeg?h=717&iar=0&w=1000&hash=4B47BC0AD485430E429977C30A7A37DF',
      },
    },
  ];

  const handleNext = async () => {
    if (step === 1) {
      if (goal.trim().length > 0) {
        setStep(2);
      }
    } else if (step === 2) {
      if (selectedPet && user?.uid) {
        const key = `setupDone-${user.uid}`;
        await AsyncStorage.setItem(key, 'true');
        navigation.reset({index: 0, routes: [{name: 'MainTabs'}]});
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  // Progress: 50% at step 1, 100% at step 2
  const progressValue = step === 1 ? 0.5 : 1.0;

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor={colors.orange} />
      <View style={styles.container}>
        <View style={styles.content}>
          {step === 1 ? (
            <View style={styles.stepContent}>
              <Text style={styles.title}>設定理財目標</Text>
              <TextInput
                style={styles.input}
                placeholder="輸入你的目標"
                placeholderTextColor="#666"
                value={goal}
                onChangeText={setGoal}
              />
            </View>
          ) : (
            <View style={styles.stepContent}>
              <Text style={styles.title}>選擇一個萌寵</Text>
              <View style={styles.petsContainer}>
                {pets.map(pet => (
                  <TouchableOpacity
                    key={pet.id}
                    style={[
                      styles.petItem,
                      selectedPet?.id === pet.id && styles.selectedPetItem,
                    ]}
                    onPress={() => setSelectedPet(pet)}>
                    <Image source={pet.image} style={styles.petImage} />
                    <Text style={styles.petName}>{pet.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Progress.Bar progress={progressValue} width={null} />
          <View style={styles.navButtonsContainer}>
            {step === 2 && (
              <TouchableOpacity onPress={handleBack} style={styles.navButton}>
                <Text style={styles.navButtonText}>上一步</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
              <Text style={styles.navButtonText}>
                {step === 1 ? '下一步' : '完成！'}
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
    justifyContent: 'space-between', // Distribute top content and bottom container
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContent: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
  },
  petsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  petItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  selectedPetItem: {
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  petImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  petName: {
    textAlign: 'center',
    color: '#fff',
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
