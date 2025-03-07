import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Layout from '../components/Layout';
import SwitchSelector from 'react-native-switch-selector';
import DurationSelector from '../components/DurationSelector';
import ExpensePieChart from '../components/ExpensePieChart';
import {colors} from '../theme/colors';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// import ExpensePieChart from '../components/ExpensePieChart';

const AnalysisScreen = () => {
  const [selectedButton, setSelectedButton] = useState<number>(2);

  const handleButtonPress = (buttonIndex: number) => {
    setSelectedButton(buttonIndex);
    console.log('selectedButton:', selectedButton);
  };

  const options = [
    {label: '收入', value: '1'},
    {label: '支出', value: '2'},
    {label: '結餘', value: '3'},
  ];

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <SwitchSelector
          initial={0}
          textColor="#000000"
          borderColor="black"
          buttonColor="#BCD635"
          selectedColor="white"
          backgroundColor={colors.background}
          hasPadding
          borderRadius={10}
          options={options}
          onPress={(value: number) => handleButtonPress(value)}
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
    marginBottom: 10,
  },
  chart: {
    marginTop: 10,
    width: '90%',
  },
});

export default AnalysisScreen;
