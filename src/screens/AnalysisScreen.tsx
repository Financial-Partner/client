import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Layout from '../components/Layout';
import SwitchSelector from 'react-native-switch-selector';
import DurationSelector from '../components/DurationSelector';
import ExpensePieChart from '../components/ExpensePieChart';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// import ExpensePieChart from '../components/ExpensePieChart';

const AnalysisScreen = () => {
  const [selectedButton, setSelectedButton] = useState<number>(2);

  const handleButtonPress = (buttonIndex:number) => {
    setSelectedButton(buttonIndex);
  };

  const options = [
    { label: '收入', value: '1' },
    { label: '支出', value: '2' },
    { label: '結餘', value: '3' },
];

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <SwitchSelector
          options={options}
          initial={0}
          onPress={(value: number) => handleButtonPress(value)}
          borderColor="#c9c9c9"
          borderWidth={3}
          style={styles.switchSelector}
        />

        <View style={styles.durationSelector}>
          <Text>查詢範圍：</Text>
          <DurationSelector />
        </View>

        <View style={styles.durationSelector}>
          <Text>開始日期：</Text>
          <DurationSelector />
        </View>

        <View style={styles.chart}>
          <Text>Pie chart</Text>
          <ExpensePieChart />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  switchSelector: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  durationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:10,
  },
  chart: {
    marginTop: 20,
  },
});

export default AnalysisScreen;
