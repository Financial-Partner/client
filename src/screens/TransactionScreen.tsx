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
import TransactionForm from '../components/TransactionForm';
import Layout from '../components/Layout';

const TransactionScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<
    {category: string; amount: number}[]
  >([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState<number>(10000); // setting Budget
  const totalExpense = transactions.reduce((sum, t) => sum + t.amount, 0); // total Expense
  const totalIncome = 15000; // total Revenue (assume to be fixed)
  const remainingBudget = budget - totalExpense; // Remain balance

  const handleAddTransaction = (amount: number, category: string) => {
    setTransactions([{category, amount}, ...transactions]); //sort by newest
    setModalVisible(false);
  };

  return (
    <Layout scrollable={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* First block：Expense & Revenue */}
        <View style={[styles.module, styles.grayBackground]}>
          <Text style={styles.label}>本月支出</Text>
          <Text style={styles.amount}>-${totalExpense}</Text>
          <Text style={styles.subText}>本月收入：${totalIncome}</Text>
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
          <Text style={styles.subText}>剩餘額度：${remainingBudget}</Text>
        </View>

        {/* Third block：details */}
        <View style={[styles.module, styles.whiteBackground]}>
          <Text style={styles.label}>帳單明細</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.transactionRow}>
                <Text style={styles.transactionCategory}>{item.category}</Text>
                <Text style={styles.transactionAmount}>{item.amount}</Text>
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
          transparent={true}>
          <View style={styles.modalContainer}>
            <TransactionForm onSubmit={handleAddTransaction} />
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>X</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

// 樣式
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
  },
  transactionCategory: {
    fontSize: 16,
    textAlign: 'left',
  },
  transactionAmount: {
    fontSize: 16,
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
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
 
  
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
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
});

export default TransactionScreen;
