import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

interface Dino {
  id: number;
  name: string;
  imageKey: string;
  image: any;
}

interface PetSelectionProps {
  selectedDino: Dino | null;
  onDinoSelect: (dino: Dino) => void;
}

const dinosaurs: Dino[] = [
  {
    id: 1,
    name: '寵物一',
    imageKey: 'blue_1',
    image: require('../../assets/characters/blue_1.png'),
  },
  {
    id: 2,
    name: '寵物二',
    imageKey: 'blue_2',
    image: require('../../assets/characters/blue_2.png'),
  },
  {
    id: 3,
    name: '寵物三',
    imageKey: 'green_1',
    image: require('../../assets/characters/green_1.png'),
  },
  {
    id: 4,
    name: '寵物四',
    imageKey: 'green_2',
    image: require('../../assets/characters/green_2.png'),
  },
  {
    id: 5,
    name: '寵物五',
    imageKey: 'green_3',
    image: require('../../assets/characters/green_3.png'),
  },
  {
    id: 6,
    name: '寵物六',
    imageKey: 'main_character',
    image: require('../../assets/characters/main_character.png'),
  },
  {
    id: 7,
    name: '寵物七',
    imageKey: 'pink_1',
    image: require('../../assets/characters/pink_1.png'),
  },
  {
    id: 8,
    name: '寵物八',
    imageKey: 'yellow_1',
    image: require('../../assets/characters/yellow_1.png'),
  },
  {
    id: 9,
    name: '寵物九',
    imageKey: 'yellow_2',
    image: require('../../assets/characters/yellow_2.png'),
  },
];

const PetSelection: React.FC<PetSelectionProps> = ({
  selectedDino,
  onDinoSelect,
}) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.title}>選擇一個萌寵</Text>
      <View style={styles.dinosContainer}>
        {dinosaurs.map(dino => (
          <TouchableOpacity
            key={dino.id}
            style={[
              styles.dinoItem,
              selectedDino?.id === dino.id && styles.selectedDinoItem,
            ]}
            onPress={() => onDinoSelect(dino)}>
            <Image source={dino.image} style={styles.dinoImage} />
            <Text style={styles.dinoName}>{dino.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  dinosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
  },
  dinoItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  selectedDinoItem: {
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  dinoImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  dinoName: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default PetSelection;
