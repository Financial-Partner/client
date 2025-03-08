import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import React, {useState} from 'react';

type chanceProps = {
  chance: {
    title: string;
    min_amount: string;
    isIncrease: boolean;
    status: number;
    tags: string[];
  };
};

const InvestmentChance = ({chance}: chanceProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.chanceContent}>
        <View style={styles.chanceHeader}>
          <Text style={styles.chanceTitle}>{chance.title}</Text>
          <Text style={styles.chanceDescription}>
            最少投資 {chance.min_amount}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          {chance.isIncrease ? (
            <Text style={styles.statusText}>🔺</Text>
          ) : (
            <Text style={styles.statusText}>🔻</Text>
          )}
          <Text style={styles.statusText}>{chance.status}%</Text>
        </View>
      </View>

      <View style={styles.tagContainer}>
        {chance.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="輸入投資金額"
          value={investmentAmount}
          onChangeText={setInvestmentAmount}
          keyboardType="numeric"
        />
        <Button
          title="投資"
          onPress={() => console.log(`Investing ${investmentAmount}`)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  chanceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  chanceDescription: {
    fontSize: 12,
    marginVertical: 3,
    color: 'grey',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginRight: 10,
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chanceHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  chanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 5,
  },
  tag: {
    backgroundColor: 'lightblue',
    color: 'blue',
    fontSize: 10,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 8,
    marginRight: 5,
  },
});

export default InvestmentChance;
