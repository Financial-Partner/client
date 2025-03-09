import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {LeftTriangle, RightTriangle} from '../svg';

type dateProp = {
  duration: String;
};

const DateSelector = ({duration}: dateProp) => {
  const [year, setYear] = useState<number>(2025);
  const [month, setMonth] = useState<number>(1);
  const [firstHalf, setFirstHalf] = useState<boolean>(true);

  const increaseMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const decreaseMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const increase = () => {
    if (duration === '一個月') {
      increaseMonth();
    } else if (duration === '半年') {
      if (firstHalf) {
        setFirstHalf(false);
      } else {
        setFirstHalf(true);
        setYear(year + 1);
      }
    } else if (duration === '一年') {
      setYear(year + 1);
    }
  };

  const decrease = () => {
    if (duration === '一個月') {
      decreaseMonth();
    } else if (duration === '半年') {
      if (firstHalf) {
        setFirstHalf(false);
        setYear(year - 1);
      } else {
        setFirstHalf(true);
      }
    } else if (duration === '一年') {
      setYear(year - 1);
    }
  };

  const displayDate = () => {
    if (duration === '一個月') {
      return `${year}/${month}`;
    } else if (duration === '半年') {
      if (firstHalf) {
        return `${year}/1 - ${year}/6`;
      } else {
        return `${year}/7 - ${year}/12`;
      }
    } else if (duration === '一年') {
      return year;
    }
  };
  return (
    <View style={styles.durationSelector}>
      <TouchableOpacity onPress={() => decrease()}>
        <LeftTriangle width={20} height={20} />
      </TouchableOpacity>
      <Text>{displayDate()}</Text>
      <TouchableOpacity onPress={() => increase()}>
        <RightTriangle width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  durationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default DateSelector;
