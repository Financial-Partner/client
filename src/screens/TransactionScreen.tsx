import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Layout from '../components/Layout';

const TransactionScreen = () => {
  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Text>交易紀錄新增</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionScreen;
