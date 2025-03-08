import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type TransactionFormProps = {
  onSubmit: (amount: number, category: string) => void;
};

const categories = ['餐飲', '交通', '娛樂', '購物', '醫療', '教育', '房租', '水電', '其他'];

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSave = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onSubmit(parsedAmount, category);
      setAmount('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>金額：</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="輸入金額"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>類別：</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)} style={styles.picker}>
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>儲存交易</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 12,
    width: '100%',
  },
  picker: {
    height: 40,
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

export default TransactionForm;
