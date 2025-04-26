import {ImageSourcePropType} from 'react-native';

export const characterImages: {[key: string]: ImageSourcePropType} = {
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

export const getCharacterImage = (id: string): ImageSourcePropType => {
  return characterImages[id] || characterImages.main_character;
};
