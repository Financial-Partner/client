import React from 'react';
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

const GachaScreen = () => {
  const cards: number[] = Array.from({length: 9});
  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <FlatList
          data={cards}
          renderItem={({item}) => <GachaCard key={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.content}
          scrollEnabled={false}
        />

        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>領養</Text>
            <Diamond height={16} width={16} style={styles.diamond} />
            <Text style={styles.buttonText}>1,000</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>
              <ChangeIcon height={12} width={12} /> 換一批 20
            </Text>
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
});

export default GachaScreen;
