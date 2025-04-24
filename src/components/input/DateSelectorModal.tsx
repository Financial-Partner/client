import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import DatePicker, {getToday} from 'react-native-modern-datepicker';

type DateSelectorModalProps = {
  setDate: (date: Date) => void;
  date: Date;
  setOpen: (open: boolean) => void;
};

const DateSelectorModal = ({
  setDate,
  date,
  setOpen,
}: DateSelectorModalProps) => {
  const today = getToday();
  const selectedDate =
    date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

  const parseDateString = (dateString: String): Date => {
    const [year, month, day] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in Date constructor
  };

  const handleDateChange = (newDate: String) => {
    const parsedDate = parseDateString(newDate);
    if (parsedDate.getTime() !== date.getTime()) {
      setDate(parsedDate);
      setOpen(false);
    }
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.centerView}>
        <View style={styles.modalView}>
          {/* <DateSelectorModal setDate={setDate} date={date} /> */}
          <DatePicker
            isGregorian={true}
            selected={selectedDate}
            maximumDate={today}
            mode="calendar"
            onSelectedChange={(newDate: String) => {
              handleDateChange(newDate);
            }}
            onDateChange={(newDate: String) => {
              handleDateChange(newDate);
            }}
            onMonthYearChange={(newDate: String) => {
              handleDateChange(newDate);
            }}
          />
          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default DateSelectorModal;
