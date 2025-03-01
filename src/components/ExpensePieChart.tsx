import React from 'react';
import {StyleSheet, View} from 'react-native';
// import {Text} from 'react-native';
// import PieChart from 'react-native-pie-chart';
// import Svg, {Circle, Rect} from 'react-native-svg';

const ExpensePieChart = () => {
  const widthAndHeight = 250;
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 321, color: '#ffb300' },
    { value: 185, color: '#ff9100' },
    { value: 123, color: '#ff6c00' },
    { value: 80, color: '#ff3c00' },
  ];

  return (
    // <PieChart widthAndHeight={widthAndHeight} series={series} />
    <View style={styles.circle} />
    // <Svg height="50%" width="50%" viewBox="0 0 100 100">
    //   <Circle
    //     cx="50"
    //     cy="50"
    //     r="45"
    //     stroke="blue"
    //     strokeWidth="2.5"
    //     fill="green"
    //   />
    //   <Rect
    //     x="15"
    //     y="15"
    //     width="70"
    //     height="70"
    //     stroke="red"
    //     strokeWidth="2"
    //     fill="yellow"
    //   />
    // </Svg>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 250,
    height: 250,
    backgroundColor: '#fbd203',
    borderRadius: 125, // Half of the width/height to make it a circle
  },
});


export default ExpensePieChart;
