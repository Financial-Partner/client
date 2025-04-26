import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import Layout from '../components/Layout';
import {
  selectAllCharacters,
  selectInventory,
} from '../store/selectors/characterSelectors';
import {Character} from '../types/character';

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

const BagScreen = () => {
  const allCharacters = useSelector(selectAllCharacters);
  const inventory = useSelector(selectInventory);
  const [selectedCharacter, setSelectedCharacter] =
    React.useState<Character | null>(null);

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const getCharacterQuantity = (characterId: string) => {
    const item = inventory.find(item => item.characterId === characterId);
    return item ? item.quantity : 0;
  };

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        {selectedCharacter && (
          <View style={styles.characterImg}>
            <Image
              source={
                characterImages[
                  selectedCharacter.id as keyof typeof characterImages
                ] || characterImages.main_character
              }
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>
        )}

        <FlatList
          data={allCharacters}
          renderItem={({item: character}) => {
            const quantity = getCharacterQuantity(character.id);
            const isOwned = quantity > 0;

            return (
              <TouchableOpacity
                style={[
                  styles.characterItem,
                  selectedCharacter?.id === character.id && styles.selected,
                  !isOwned && styles.unowned,
                ]}
                onPress={() => handleSelect(character)}>
                <Image
                  source={
                    characterImages[
                      character.id as keyof typeof characterImages
                    ] || characterImages.main_character
                  }
                  style={styles.characterImage}
                  resizeMode="contain"
                />
                {isOwned ? (
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>x{quantity}</Text>
                  </View>
                ) : (
                  <View style={styles.lockOverlay}>
                    <Text style={styles.lockText}>未擁有</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={styles.characterContainer}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  characterImg: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: 200,
    height: 200,
  },
  characterContainer: {
    backgroundColor: 'rgba(247, 245, 242, 0.6)',
    padding: 10,
    borderRadius: 10,
    width: '100%',
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
  unowned: {
    opacity: 0.7,
  },
  quantityBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  quantityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  lockText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BagScreen;
