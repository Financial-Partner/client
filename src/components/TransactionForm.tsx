import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateSelectorModal from './input/DateSelectorModal';

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

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
}

interface TransactionFormProps {
  onSubmit: (
    amount: number,
    category: string,
    transaction_type: TransactionType,
    date: Date,
  ) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({onSubmit}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0],
  );
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType>(TransactionType.Expense);
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const handleNumberPress = (num: string) => {
    setAmount(prev => prev + num);
  };

  const handleDelete = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const handleConfirm = async () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onSubmit(parsedAmount, selectedCategory, selectedTransactionType, date);
      setAmount('');
      setSelectedCategory(categories[0]);
      setSelectedTransactionType(TransactionType.Expense);
      setDate(new Date());
      setOpen(false);
    }
    //   try {
    //     // Add query parameters to the URL
    //     // const queryParams = new URLSearchParams({
    //     //   amount: parsedAmount.toString(),
    //     //   category: selectedCategory,
    //     // });

    //     const res = await fetch('http://10.0.2.2:8080/api/transactions', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'dummy-token-for-development', // Add your token here
    //       },
    //     });

    //     const data = await res.json();
    //     console.log('Response from backend:', data);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
  };

  const formatDate = (d: Date) => {
    return `${d.getFullYear()}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>選擇類別</Text>
      <View style={styles.categoryContainer}>
        {Object.values(TransactionType).map(type => (
          <Pressable
            key={type}
            style={[
              styles.categoryButton,
              selectedTransactionType === type && styles.selectedCategory,
            ]}
            onPress={() => setSelectedTransactionType(type as TransactionType)}>
            <Text style={styles.categoryText}>
              {type === TransactionType.Expense ? '支出' : '收入'}
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

      <Text style={styles.title}>選擇交易日期</Text>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.dateInput}>{formatDate(date)}</Text>
      </TouchableOpacity>
      {open && (
        <DateSelectorModal setDate={setDate} date={date} setOpen={setOpen} />
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
  selectedCategory: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
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
  dateInput: {
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default TransactionForm;
