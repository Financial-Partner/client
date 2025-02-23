import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Header from '../components/Header';

const InvestScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />
      <View style={styles.content}>
        <Text>投資畫面</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InvestScreen; 