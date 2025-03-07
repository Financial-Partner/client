import React, { useState } from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput, Pressable} from 'react-native';
import Layout from '../components/Layout';
import { Picker } from '@react-native-picker/picker';

const categories = ['餐飲', '交通', '娛樂', '醫療', '教育', '房租', '水電', '其他'];

const TransactionScreen = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState<{ amount: number; category: string }[]>([]);

  const handleSaveTransaction = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      setTransactions([...transactions, { amount: parsedAmount, category }]);
      setTotalAmount(totalAmount + parsedAmount);
      setAmount('');
    }
  };

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Text style={styles.totalText}>目前累積金額：${totalAmount}</Text>

        <Text style={styles.label}>金額：</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="輸入金額"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>類別：</Text>
        <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>

        <Pressable style={styles.button} onPress={handleSaveTransaction}>
          <Text style={styles.buttonText}>儲存交易</Text>
        </Pressable>
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
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
  },
  picker: {
    height: 40,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TransactionScreen;
