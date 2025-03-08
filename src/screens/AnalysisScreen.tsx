import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Layout from '../components/Layout';
import ExpensePieChart from '../components/ExpensePieChart';
import DurationSelector from '../components/DurationSelector';
import TypeSelector from '../components/TypeSelector';
import DateSelector from '../components/DateSelector';

const AnalysisScreen = () => {
  const [duration, setDuration] = useState<String>('一個月');
  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <TypeSelector />
        <DurationSelector duration={duration} setDuration={setDuration} />
        <DateSelector duration={duration} />

        <View style={styles.chart}>
          <ExpensePieChart />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  chart: {
    marginTop: 10,
    width: '90%',
  },
});

export default AnalysisScreen;
