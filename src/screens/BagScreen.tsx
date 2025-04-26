import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Layout from '../components/Layout';
import {
  selectAllCharacters,
  selectInventory,
} from '../store/selectors/characterSelectors';
import {Character} from '../types/character';
import {useAppSelector} from '../store';
import {setSelectedDino} from '../store/slices/settingsSlice';

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
  const dispatch = useDispatch();
  const allCharacters = useSelector(selectAllCharacters);
  const inventory = useSelector(selectInventory);
  const {selectedDino} = useAppSelector(state => state.settings);
  const [selectedCharacter, setSelectedCharacter] =
    React.useState<Character | null>(null);

  useEffect(() => {
    // Update selected character when selectedDino changes
    if (selectedDino) {
      const character = allCharacters.find(char => char.id === selectedDino);
      if (character) {
        setSelectedCharacter(character);
      }
    }
  }, [selectedDino, allCharacters]);

  const handleSelect = (character: Character) => {
    const quantity = getCharacterQuantity(character.id);
    if (quantity > 0) {
      setSelectedCharacter(character);
      dispatch(setSelectedDino(character.id));
    }
  };

  const getCharacterQuantity = (characterId: string) => {
    const item = inventory.find(it => it.characterId === characterId);
    return item ? item.quantity : 0;
  };

  return (
    <Layout scrollable={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.previewSection}>
          <Text style={styles.previewTitle}>當前夥伴角色</Text>
          {selectedCharacter ? (
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
          ) : (
            <View style={styles.emptyPreview}>
              <Text style={styles.emptyPreviewText}>尚未選擇夥伴角色</Text>
            </View>
          )}
        </View>

        <View style={styles.characterListSection}>
          <Text style={styles.listTitle}>角色列表</Text>
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
            ListFooterComponent={<View style={styles.footer} />}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  previewSection: {
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  characterImg: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(247, 245, 242, 0.6)',
  },
  mainImage: {
    width: 200,
    height: 200,
  },
  emptyPreview: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(247, 245, 242, 0.6)',
  },
  emptyPreviewText: {
    fontSize: 16,
    color: '#666',
  },
  characterListSection: {
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  footer: {
    height: 20,
  },
});

export default BagScreen;
