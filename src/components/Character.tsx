import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface CharacterData {
    hasOwned: boolean;
    isUsed: boolean;
    imageUrl: string;
}

type CharacterProps = {
    character: CharacterData;
}

const Character = ({character}: CharacterProps) => {
  return (
    <View style={[styles.characterImg, character.hasOwned && styles.show, character.isUsed && styles.highlight]}>
      <Text>
        main character
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    characterImg: {
        width: 100,
        height: 150,
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    show: {
        backgroundColor: 'yellow',
    },
    highlight: {
        backgroundColor: 'lightgreen',
    }
});

export default Character;
