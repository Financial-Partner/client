import {ImageSourcePropType} from 'react-native';
import {getCharacterImage} from './characterImages';

export interface CharacterDefinition {
  id: string;
  name: string;
  imageKey: string;
  image: ImageSourcePropType;
}

export const characters: CharacterDefinition[] = [
  {
    id: 'blue_1',
    name: '寵物一',
    imageKey: 'blue_1',
    image: getCharacterImage('blue_1'),
  },
  {
    id: 'blue_2',
    name: '寵物二',
    imageKey: 'blue_2',
    image: getCharacterImage('blue_2'),
  },
  {
    id: 'green_1',
    name: '寵物三',
    imageKey: 'green_1',
    image: getCharacterImage('green_1'),
  },
  {
    id: 'green_2',
    name: '寵物四',
    imageKey: 'green_2',
    image: getCharacterImage('green_2'),
  },
  {
    id: 'green_3',
    name: '寵物五',
    imageKey: 'green_3',
    image: getCharacterImage('green_3'),
  },
  {
    id: 'main_character',
    name: '寵物六',
    imageKey: 'main_character',
    image: getCharacterImage('main_character'),
  },
  {
    id: 'pink_1',
    name: '寵物七',
    imageKey: 'pink_1',
    image: getCharacterImage('pink_1'),
  },
  {
    id: 'yellow_1',
    name: '寵物八',
    imageKey: 'yellow_1',
    image: getCharacterImage('yellow_1'),
  },
  {
    id: 'yellow_2',
    name: '寵物九',
    imageKey: 'yellow_2',
    image: getCharacterImage('yellow_2'),
  },
];
