import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {LeftTriangle, RightTriangle} from '../svg';
import {Duration} from './input/DurationSelector';

type dateProp = {
  duration: Duration;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const DateController = ({
  duration,
  selectedDate,
  setSelectedDate,
}: dateProp) => {
  const today = new Date();

  const isBeyond = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    switch (duration) {
      case Duration.OneDay:
        if (year === today.getFullYear() && month === today.getMonth()) {
          return selectedDate.getDate() >= today.getDate();
        }
        return false;
      case Duration.OneMonth:
        return today.getMonth() === month && today.getFullYear() === year;
      case Duration.SixMonths:
        return (
          today.getFullYear() === selectedDate.getFullYear() &&
          (month >= 6 || today.getMonth() < 6)
        );
      case Duration.OneYear:
        return today.getFullYear() === year;
    }
  };

  const increase = () => {
    if (isBeyond()) {
      return;
    }
    switch (duration) {
      case Duration.OneDay:
        setSelectedDate(
          new Date(selectedDate.setDate(selectedDate.getDate() + 1)),
        );
        break;
      case Duration.OneMonth:
        setSelectedDate(
          new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)),
        );
        break;
      case Duration.SixMonths:
        setSelectedDate(
          new Date(selectedDate.setMonth(selectedDate.getMonth() + 6)),
        );
        break;
      case Duration.OneYear:
        setSelectedDate(
          new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1)),
        );
        break;
    }
  };

  const decrease = () => {
    if (duration === Duration.OneDay) {
      setSelectedDate(
        new Date(selectedDate.setDate(selectedDate.getDate() - 1)),
      );
    } else if (duration === Duration.OneMonth) {
      setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)),
      );
    } else if (duration === Duration.SixMonths) {
      setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() - 6)),
      );
    } else if (duration === Duration.OneYear) {
      setSelectedDate(
        new Date(selectedDate.setFullYear(selectedDate.getFullYear() - 1)),
      );
    }
  };

  const displayDate = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const date = selectedDate.getDate();
    if (duration === Duration.OneDay) {
      return year + '/' + month + '/' + date;
    } else if (duration === Duration.OneMonth) {
      return year + '/' + month;
    } else if (duration === Duration.SixMonths) {
      if (month < 7) {
        return `${year}/1 - ${year}/6`;
      } else {
        return `${year}/7 - ${year}/12`;
      }
    } else if (duration === Duration.OneYear) {
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

export default DateController;
