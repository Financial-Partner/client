import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Layout from '../components/Layout';
//import Character from '../components/Character';

// image (delete)
const characterImages = {
  blue_1: require('../assets/characters/blue_1.png'),
  blue_2: require('../assets/characters/blue_2.png'),
  green_1: require('../assets/characters/green_1.png'),
  green_2: require('../assets/characters/green_2.png'),
  green_3: require('../assets/characters/green_3.png'),
  pink_1: require('../assets/characters/pink_1.png'),
  yellow_1: require('../assets/characters/yellow_1.png'),
  yellow_2: require('../assets/characters/yellow_2.png'),
  main_character: require('../assets/characters/main_character.png'),
};

type CharacterKey = keyof typeof characterImages;
interface CharacterType {
  id: number;
  key: CharacterKey;
  hasOwned: boolean;
  isUsed: boolean;
}

const BagScreen = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [mainCharacterKey, setMainCharacterKey] =
    useState<CharacterKey>('main_character');

  const fetchCharacters = async () => {
    // GET /components/characters
    const mockData: CharacterType[] = [
      {id: 1, key: 'blue_1', hasOwned: true, isUsed: false},
      {id: 2, key: 'blue_2', hasOwned: true, isUsed: true},
      {id: 3, key: 'green_1', hasOwned: false, isUsed: false},
      {id: 4, key: 'green_2', hasOwned: true, isUsed: false},
      {id: 5, key: 'pink_1', hasOwned: true, isUsed: false},
      {id: 6, key: 'yellow_1', hasOwned: false, isUsed: false},
      {id: 7, key: 'yellow_2', hasOwned: false, isUsed: false},
      {id: 8, key: 'green_3', hasOwned: true, isUsed: false},
    ];
    setCharacters(mockData);
    const current = mockData.find(c => c.isUsed);
    if (current) {setMainCharacterKey(current.key);}
  };

  const handleSelect = (key: CharacterKey) => {
    setMainCharacterKey(key);
    setCharacters(prev => prev.map(c => ({...c, isUsed: c.key === key})));
    // await fetch('/user/main-character', { method: 'POST', body: JSON.stringify({ key }) });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.characterImg}>
          <Image
            source={characterImages[mainCharacterKey]}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        <FlatList
          data={characters}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.characterItem, item.isUsed && styles.selected]}
              onPress={() => item.hasOwned && handleSelect(item.key)}
              disabled={!item.hasOwned}>
              <Image
                source={characterImages[item.key]}
                style={styles.characterImage}
                resizeMode="contain"
              />
              {!item.hasOwned && (
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockText}>未擁有</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.characterContainer}
          scrollEnabled={false}
        />
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
    width: 200,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  characterContainer: {
    backgroundColor: 'rgba(247, 245, 242, 0.6)',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  characterItem: {
    width: 100,
    height: 150,
    backgroundColor: '#eee',
    borderRadius: 10,
    margin: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  characterImage: {
    width: '100%',
    height: '100%',
  },
  selected: {
    borderWidth: 3,
    borderColor: '#007BFF',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  lockText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BagScreen;
