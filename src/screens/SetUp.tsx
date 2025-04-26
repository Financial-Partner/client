import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Layout from '../components/Layout';
import {colors} from '../theme/colors';
import {useUserProfileManager} from '../api/userService';

// Define character keys and their corresponding image sources
const CHARACTER_IMAGES = {
  blue_1: require('../assets/characters/blue_1.png'),
  blue_2: require('../assets/characters/blue_2.png'),
  green_1: require('../assets/characters/green_1.png'),
  green_2: require('../assets/characters/green_2.png'),
  green_3: require('../assets/characters/green_3.png'),
  pink_1: require('../assets/characters/pink_1.png'),
  yellow_1: require('../assets/characters/yellow_1.png'),
  yellow_2: require('../assets/characters/yellow_2.png'),
} as const;

type CharacterKey = keyof typeof CHARACTER_IMAGES;

const getApiPath = (key: CharacterKey) => `/characters/${key}.png`;

const SetUp = () => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterKey | null>(null);
  const navigation = useNavigation();
  const {setCharacter} = useUserProfileManager();

  const handleSelect = (key: CharacterKey) => {
    setSelectedCharacter(key);
  };

  const handleComplete = async () => {
    if (!selectedCharacter) {
      return;
    }

    try {
      const imageUrl = getApiPath(selectedCharacter);
      console.log('Sending character data:', {
        character_id: selectedCharacter,
        image_url: imageUrl,
      });

      const result = await setCharacter({
        character_id: selectedCharacter,
        image_url: imageUrl,
      });
      console.log('Character set successfully:', result);

      navigation.reset({
        index: 0,
        routes: [{name: 'MainTabs' as never}],
      });
    } catch (error: any) {
      console.error('Failed to set character:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
    }
  };

  return (
    <Layout>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>選擇你的角色</Text>
        <View style={styles.characterGrid}>
          {Object.entries(CHARACTER_IMAGES).map(([key, imageSource]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.characterButton,
                selectedCharacter === key && styles.selectedCharacter,
              ]}
              onPress={() => handleSelect(key as CharacterKey)}>
              <Image source={imageSource} style={styles.characterImage} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.completeButton,
            !selectedCharacter && styles.disabledButton,
          ]}
          onPress={handleComplete}
          disabled={!selectedCharacter}>
          <Text style={styles.completeButtonText}>完成</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  characterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  characterButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  selectedCharacter: {
    borderColor: colors.accent,
    borderWidth: 3,
  },
  characterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  completeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  completeButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SetUp;
