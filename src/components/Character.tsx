import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type characterProps = {
    character: {
        hasOwned: boolean,
        isUsed: boolean,
        imageUrl: string,
    }
}

const Character = ({character}: characterProps) => {
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
