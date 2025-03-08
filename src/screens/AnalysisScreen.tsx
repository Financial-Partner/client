import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Layout from '../components/Layout';
import ExpensePieChart from '../components/ExpensePieChart';
import LeftTriangle from '../svg/LeftTriangle';
import RightTriangle from '../svg/RightTriangle';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButton = ({label, selected, onPress}: RadioButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.radioButton, selected && styles.selectedButton]}
      onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const AnalysisScreen = () => {
  const [selectedButton, setSelectedButton] = useState<String>('收入');
  const [selectedOption, setSelectedOption] = useState<String>('Option 1');
  const options = ['收入', '支出', '結餘'];
  const duration = ['一個月', '半年', '一年', '自訂'];

  const handleButtonPress = (type: String) => {
    setSelectedButton(type);
    console.log('selectedButton:', selectedButton);
  };

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.typeSelector}>
          {options.map((option, index) => (
            <RadioButton
              key={index}
              label={option}
              selected={selectedButton === option}
              onPress={() => handleButtonPress(option)}
            />
          ))}
        </View>

        <View style={styles.durationContainer}>
          {duration.map((option, index) => (
            <RadioButton
              key={index}
              label={option}
              selected={selectedOption === option}
              onPress={() => setSelectedOption(option)}
            />
          ))}
        </View>

        <View style={styles.durationSelector}>
          <LeftTriangle width={20} height={20} />
          <Text>自訂日期</Text>
          <RightTriangle width={20} height={20} />
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
    marginTop: 5,
    marginBottom: 10,
  },
  durationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 10,
    marginBottom: 10,
  },
  chart: {
    marginTop: 10,
    width: '90%',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  label: {
    fontSize: 16,
    paddingVertical: 3,
    alignContent: 'center',
  },
  radioButton: {
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '99%',
  },
  selectedButton: {
    backgroundColor: '#BCD635',
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '95%',
    marginTop: 10,
    borderTopColor: '#555',
    borderTopWidth: 1,
    borderBottomColor: '#555',
    borderBottomWidth: 1,
    padding: 0,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '50%',
    marginTop: 10,
    padding: 0,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default AnalysisScreen;
