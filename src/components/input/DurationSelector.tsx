import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import RadioButton from './RadioButton';
import DateSelectorModal from './DateSelectorModal';
import DateController from '../DateController';

export enum Duration {
  OneDay = '一天',
  OneMonth = '一個月',
  SixMonths = '半年',
  OneYear = '一年',
}

type DurationSelectorProps = {
  duration: Duration;
  setDuration: (mode: Duration) => void;
};

const DurationSelector = ({duration, setDuration}: DurationSelectorProps) => {
  const durations = [
    Duration.OneDay,
    Duration.OneMonth,
    Duration.SixMonths,
    Duration.OneYear,
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const DurationChange = (option: Duration) => {
    if (option === Duration.OneDay) {
      setOpen(true);
    }
    setDuration(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.durationContainer}>
        {durations.map((option, index) => (
          <RadioButton
            key={index}
            label={option}
            selected={duration === option}
            onPress={() => DurationChange(option)}
            radioType="durationSelector"
          />
        ))}
      </View>

      <DateController
        duration={duration}
        selectedDate={date}
        setSelectedDate={setDate}
      />
      {open && (
        <DateSelectorModal setDate={setDate} date={date} setOpen={setOpen} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
});

export default DurationSelector;
