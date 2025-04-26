import React, {useState} from 'react';
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
import {Transaction} from '../store/slices/transactionSlice';
import {useTransactions} from '../api/transactionService';
import {useMissions} from '../api/missionService';

const TransactionScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState<number>(10000);
  const {transactions, addTransaction} = useTransactions();
  const {updateMission} = useMissions();

  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);
  const monthlyBalance = totalIncome - totalExpense;

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
    console.log(
      'Adding transaction:',
      amount,
      category,
      transaction_type,
      date,
    );

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      description: '',
      date: formattedDate(date),
      category,
      type: transaction_type,
    };

    try {
      // Add the transaction
      console.log('Dispatching addTransaction');
      await addTransaction(newTransaction);

      // Update mission status based on transaction type
      if (transaction_type === 'INCOME' && amount >= 500) {
        // Only update income mission if it's a new income transaction
        await updateMission('income', true);
      } else if (transaction_type === 'EXPENSE') {
        // Only update transaction mission if it's a new expense transaction
        await updateMission('transaction', true);
      }

      // Close modal after transaction is added
      setModalVisible(false);

      console.log('Transaction added successfully');
    } catch (error) {
      console.error('Error handling transaction:', error);
    }
  };

  const getCurrentYearMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}年${now.getMonth() + 1}月`;
  };

  return (
    <Layout scrollable={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.yearMonth}>{getCurrentYearMonth()}</Text>

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
            <Text style={styles.label}>剩餘額度</Text>
            <Text
              style={[
                styles.amount,
                monthlyBalance >= 0 ? styles.positive : styles.negative,
              ]}>
              ${budget - totalExpense}
            </Text>
          </View>
          <View style={styles.budgetContainer}>
            <Text style={styles.subText}>本月預算：${budget}</Text>
            <Pressable
              style={styles.editButton}
              onPress={() => setBudget(budget + 1000)}>
              <Text style={styles.buttonText}>修改</Text>
            </Pressable>
          </View>
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
  yearMonth: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  module: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  grayBackground: {
    backgroundColor: 'rgba(200, 160, 230, 0.8)',
  },
  blueBackground: {
    backgroundColor: 'rgba(173, 216, 230, 0.8)',
  },
  whiteBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    fontSize: 16,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
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
