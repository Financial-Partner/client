import {View, StyleSheet, Image} from 'react-native';
import React from 'react';

interface GachaCardProps {
  image: any;
}

const GachaCard: React.FC<GachaCardProps> = ({image}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
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
  image: {
    width: '100%',
    height: '100%',
  },
});

export default GachaCard;
