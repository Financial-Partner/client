import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';

type LabelProp = {
  value: number;
  text: string;
  color: string;
};

const getPercentage = (value: number, total: number) => {
  return ((value / total) * 100).toFixed(1) + '%';
};

const showLabel = (label: LabelProp) => {
  return (
    <View style={styles.labelContainer} key={label.text}>
      <View style={[styles.labelColor, {backgroundColor: label.color}]} />
      <Text style={styles.labelType}>{label.text}</Text>
      <Text style={styles.amount}>${label.value}</Text>
    </View>
  );
};

const ExpensePieChart = () => {
  const widthAndHeight = 250;

  const labels = [
    {text: '交通', color: '#D12DCE', value: 430},
    {text: '午餐', color: '#EA8034', value: 321},
    {text: '晚餐', color: '#F32827', value: 185},
    {text: '社交', color: '#93E420', value: 123},
    {text: '衣服', color: '#2966EA', value: 76},
    {text: '娛樂', color: '#F0F018', value: 45},
  ];

  const totalCost = labels.reduce((acc, cur) => acc + cur.value, 0);

  const series = [
    {
      value: labels[0].value,
      color: labels[0].color,
      label: {text: getPercentage(labels[0].value, totalCost), fill: 'white'},
    },
    {
      value: labels[1].value,
      color: labels[1].color,
      label: {text: getPercentage(labels[1].value, totalCost), fill: 'white'},
    },
    {
      value: labels[2].value,
      color: labels[2].color,
      label: {text: getPercentage(labels[2].value, totalCost), fill: 'white'},
    },
    {
      value: labels[3].value,
      color: labels[3].color,
      label: {text: getPercentage(labels[3].value, totalCost), fill: 'black'},
    },
    {
      value: labels[4].value,
      color: labels[4].color,
      label: {text: getPercentage(labels[4].value, totalCost), fill: 'white'},
    },
    {
      value: labels[5].value,
      color: labels[5].color,
      label: {text: getPercentage(labels[5].value, totalCost), fill: 'black'},
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>支出比例</Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        cover={0.5}
        padAngle={0.02}
      />
      <View style={styles.labelsGrid}>
        {labels.map(label => showLabel(label))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: '28%',
  },
  labelColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  labelType: {
    marginRight: 10,
    color: 'black',
    // fontWeight: 'bold',
  },
  amount: {
    color: 'black',
    // fontWeight: 'bold',
    marginRight: 10,
  },
  labelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    margin: 20,
    padding: 8,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
  },
});

export default ExpensePieChart;
