import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const categories: string[] = [
  '餐飲',
  '交通',
  '娛樂',
  '醫療',
  '教育',
  '房租',
  '水電',
  '其他',
];
type TransactionTypes = 'Income' | 'Expense';

interface TransactionFormProps {
  onSubmit: (
    amount: number,
    category: string,
    transaction_type: TransactionTypes,
    date: Date,
  ) => void;
}

const TransactionTypeLabels: Record<TransactionTypes, string> = {
  Income: '收入',
  Expense: '支出',
};

const TransactionForm: React.FC<TransactionFormProps> = ({onSubmit}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0],
  );
  const [selectedType, setSelectedType] = useState<TransactionTypes>('Expense');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleNumberPress = (num: string) => {
    setAmount(prev => prev + num);
  };

  const handleDelete = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onSubmit(parsedAmount, selectedCategory, selectedType, date);
      setAmount('');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>選擇類別</Text>
      <View style={styles.categoryContainer}>
        {Object.keys(TransactionTypeLabels).map(type => (
          <Pressable
            key={type}
            style={[
              styles.categoryButton,
              selectedType === type && styles.selectedCategory,
            ]}
            onPress={() => setSelectedType(type as TransactionTypes)}>
            <Text style={styles.categoryText}>
              {TransactionTypeLabels[type as TransactionTypes]}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.title}>選擇種類</Text>
      <View style={styles.categoryContainer}>
        {categories.map(cat => (
          <Pressable
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(cat)}>
            <Text style={styles.categoryText}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={toggleDatePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.title}>輸入金額</Text>
      <Text style={styles.amountText}>{amount || '0'}</Text>

      <View style={styles.keypad}>
        {['1', '2', '3', 'Del', '4', '5', '6', '0', '7', '8', '9', '確認'].map(
          (key, index) => (
            <Pressable
              key={index}
              style={[
                styles.key,
                key === '確認' && styles.confirmKey,
                key === 'Del' && styles.deleteKey,
              ]}
              onPress={() => {
                if (key === '確認') {
                  handleConfirm();
                } else if (key === 'Del') {
                  handleDelete();
                } else {
                  handleNumberPress(key.toString());
                }
              }}>
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  selectedCategory: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  amountText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmKey: {
    backgroundColor: '#4169E1',
  },
  deleteKey: {
    backgroundColor: '#ffe384',
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TransactionForm;
