import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  StatusBar,
} from 'react-native';
import TransactionForm from '../components/TransactionForm';
import Layout from '../components/Layout';
import {transactionService, Transaction} from '../api/transactionService';

const TransactionScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState<number>(10000); // setting Budget
  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlyBalance = totalIncome - totalExpense; // Monthly balance

  const formattedDate = (d: Date) => {
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  const handleAddTransaction = async (
    amount: number,
    category: string,
    transaction_type: 'INCOME' | 'EXPENSE',
    date: Date,
  ) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      description: '',
      date: formattedDate(date),
      category,
      type: transaction_type,
    };
    const updatedTransactions = [newTransaction, ...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setTransactions(updatedTransactions); //sort by newest
    setModalVisible(false);
    try {
      await transactionService.createTransaction(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionService.getTransactions();
        const sortedTransactions = response.transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Layout scrollable={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* First block：Monthly Summary */}
        <View style={[styles.module, styles.grayBackground]}>
          <Text style={styles.label}>本月收支</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>收入</Text>
              <Text style={styles.summaryAmount}>+${totalIncome}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>支出</Text>
              <Text style={styles.summaryAmount}>-${totalExpense}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>結餘</Text>
              <Text
                style={[
                  styles.summaryAmount,
                  monthlyBalance >= 0 ? styles.positive : styles.negative,
                ]}>
                {monthlyBalance >= 0 ? '+' : ''}
                {monthlyBalance}
              </Text>
            </View>
          </View>
        </View>

        {/* Second block：Budget & remain balance */}
        <View style={[styles.module, styles.blueBackground]}>
          <View style={styles.row}>
            <Text style={styles.label}>本月預算</Text>
            <View style={styles.budgetContainer}>
              <Text style={styles.amount}>${budget}</Text>
              <Pressable
                style={styles.editButton}
                onPress={() => setBudget(budget + 1000)}>
                <Text style={styles.buttonText}>修改</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.subText}>剩餘額度：${monthlyBalance}</Text>
        </View>

        {/* Third block：details */}
        <View style={[styles.module, styles.whiteBackground]}>
          <Text style={styles.label}>帳單明細</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.transactionRow}>
                <Text style={styles.transactionDate}>{item.date}</Text>
                <Text style={styles.transactionCategory}>{item.category}</Text>
                <Text style={styles.transactionAmount}>
                  {item.type === 'INCOME' ? '+' : '-'}
                  {item.amount}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>暫無交易紀錄</Text>
            }
          />
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              </View>
              <TransactionForm onSubmit={handleAddTransaction} />
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#007BFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  module: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  grayBackground: {
    backgroundColor: 'rgba(200, 160, 230, 0.8)', // light purple
  },
  blueBackground: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)', // light blue
  },
  whiteBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // white
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    fontSize: 16,
  },
  transactionDate: {
    width: 160,
    textAlign: 'left',
  },
  transactionCategory: {
    width: 80,
    textAlign: 'left',
  },
  transactionAmount: {
    width: 50,
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
  },
  addButtonText: {
    fontSize: 32,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  positive: {
    color: '#28a745',
  },
  negative: {
    color: '#dc3545',
  },
});

export default TransactionScreen;
