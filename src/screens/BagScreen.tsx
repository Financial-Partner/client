import React from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import Layout from '../components/Layout';
import Character from '../components/Character';

const BagScreen = () => {
  const characters = [
    {
      hasOwned: true,
      isUsed: false,
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      hasOwned: true,
      isUsed: true,
      imageUrl: 'https://example.com/image2.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image3.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image4.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image5.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image6.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image7.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image8.jpg',
    },
    {
      hasOwned: true,
      isUsed: false,
      imageUrl: 'https://example.com/image9.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image10.jpg',
    },
    {
      hasOwned: true,
      isUsed: false,
      imageUrl: 'https://example.com/image11.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image12.jpg',
    },
    {
      hasOwned: true,
      isUsed: false,
      imageUrl: 'https://example.com/image13.jpg',
    },
    {
      hasOwned: false,
      isUsed: false,
      imageUrl: 'https://example.com/image14.jpg',
    },
    {
      hasOwned: true,
      isUsed: false,
      imageUrl: 'https://example.com/image15.jpg',
    },
  ];

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.characterImg}>
          <Text>main character</Text>
        </View>

        <FlatList
          data={characters}
          renderItem={({item, index}) => (
            <Character key={index} character={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.characterContainer}
          scrollEnabled={false}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  characterImg: {
    width: 200,
    height: 250,
    backgroundColor: 'lightblue',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  characterContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});

export default BagScreen;
