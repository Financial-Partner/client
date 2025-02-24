import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Layout from '../components/Layout';
import InvestmentChance from '../components/InvestmentChance';

const InvestScreen = () => {
  const chances = [
    {
      title: '房地產',
      min_amount: '$100',
      isIncrease: true,
      status: 10,
      tags: ['低風險', '3個月'],
    },
    {
      title: '股票',
      min_amount: '300',
      isIncrease: false,
      status: 5,
      tags: ['高風險', '1年'],
    },
    {
      title: '加密貨幣',
      min_amount: '200',
      isIncrease: true,
      status: 20,
      tags: ['高風險', '1年'],
    },
    {
      title: '債券',
      min_amount: '500',
      isIncrease: false,
      status: 3,
      tags: ['低風險', '3個月'],
    },
    {
      title: '商品',
      min_amount: '100',
      isIncrease: true,
      status: 15,
      tags: ['高風險', '1年'],
    },
  ];

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.summaryContainer}>
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>總投資</Text>
            <Text style={styles.summaryContent}>💰 1,000,000</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>平均報酬率</Text>
            <Text style={styles.summaryContent}>🔺 10.5%</Text>
          </View>
        </View>

        <View style={styles.chanceContainer}>
          <Text style={styles.chanceTitle}>投資機會</Text>
          {chances.map((chance, index) => (
            <InvestmentChance key={index} chance={chance} />
          ))}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  summary: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '45%',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryContent: {
    textAlign: 'right',
  },
  chanceContainer: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 30,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    overflow: 'scroll',
  },
  chanceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 'auto',
  },
});

export default InvestScreen;
