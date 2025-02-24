import React from 'react';
import {StyleSheet, StatusBar, FlatList, TouchableOpacity, Text, View} from 'react-native';
import Layout from '../components/Layout';
import Card from '../components/Card';

const GachaScreen = () => {
  const cards:number[] = Array.from({ length: 9 });
  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <FlatList
          data={cards}
          renderItem={({ item }) => <Card key={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
        />

        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>領養</Text>
            <Text style={styles.buttonText}>💰 1,000</Text>
          </TouchableOpacity>
          <Text>🔄 換一批 20</Text>
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
    marginRight: 10,
  },
  btnGroup: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default GachaScreen;
