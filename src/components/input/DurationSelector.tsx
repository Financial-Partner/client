import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';

import RadioButton from './RadioButton';
import DateSelector from './DateSelector';
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
        <Modal animationType="slide" transparent={true} visible={open}>
          <View style={styles.centerView}>
            <View style={styles.modalView}>
              <DateSelector setDate={setDate} date={date} />
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
});

export default DurationSelector;
