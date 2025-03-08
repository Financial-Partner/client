import React, { useState } from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Layout from '../components/Layout';
import TransactionForm from '../components/TransactionForm';

const TransactionScreen = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState<{ amount: number; category: string }[]>([]);

  const handleAddTransaction = (amount: number, category: string) => {
    setTransactions([...transactions, { amount, category }]);
    setTotalAmount(totalAmount + amount);
  };

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Text style={styles.totalText}>目前累積金額：${totalAmount}</Text>
        <TransactionForm onSubmit={handleAddTransaction} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default TransactionScreen;
