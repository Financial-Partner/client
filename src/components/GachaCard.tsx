import {View, StyleSheet, Text} from 'react-native';
import React from 'react';

const GachaCard = () => {
  return (
    <View style={styles.container}>
      <Text>Card</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 150,
        backgroundColor: 'pink',
        borderRadius: 10,
        margin: 8,
    },
});

export default GachaCard;
