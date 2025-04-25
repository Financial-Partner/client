import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import GachaCard from '../components/GachaCard';
import {Diamond, ChangeIcon} from '../svg';

// image (delete)
const characterImages = [
  require('../assets/characters/blue_1.png'),
  require('../assets/characters/blue_2.png'),
  require('../assets/characters/green_1.png'),
  require('../assets/characters/green_2.png'),
  require('../assets/characters/green_3.png'),
  require('../assets/characters/pink_1.png'),
  require('../assets/characters/yellow_1.png'),
  require('../assets/characters/yellow_2.png'),
  require('../assets/characters/main_character.png'),
  require('../assets/characters/blue_3.png'),
  require('../assets/characters/green_4.png'),
  require('../assets/characters/green_5.png'),
  require('../assets/characters/green_6.png'),
  require('../assets/characters/pink_2.png'),
  require('../assets/characters/yellow_3.png'),
  require('../assets/characters/yellow_4.png'),
  require('../assets/characters/main_character2.png'),
];

const GachaScreen = () => {
  const [cards, setCards] = useState<number[]>([]);

  const refreshCards = () => {
    // Create an array of indices (0 to 17)
    const indices = Array.from({length: characterImages.length}, (_, i) => i);

    // Shuffle the array
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Select the first 9 items
    const newCards = indices.slice(0, 9);
    setCards(newCards);
  };

  const adoptCard = () => {
    console.log('領養成功！');
    // fetch('/gacha', { method: 'POST', body: { action: 'adopt' }})
  };

  useEffect(() => {
    refreshCards();
  }, []);

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <FlatList
          data={cards}
          renderItem={({item}) => <GachaCard image={characterImages[item]} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
        />

        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.button} onPress={adoptCard}>
            <Text style={styles.buttonText}>領養</Text>
            <Diamond height={16} width={16} style={styles.diamond} />
            <Text style={styles.buttonText}>1,000</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshButton} onPress={refreshCards}>
            <ChangeIcon height={12} width={12} />
            <Text style={styles.refreshText}>換一批 20</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
  },
  btnGroup: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  diamond: {
    marginRight: 10,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#007BFF',
  },
});

export default GachaScreen;
