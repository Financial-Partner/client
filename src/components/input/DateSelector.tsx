import React from 'react';
import DatePicker, {getToday} from 'react-native-modern-datepicker';

type dateSelectorProps = {
  setDate: (date: Date) => void;
  date: Date;
};

const DateSelector = ({setDate, date}: dateSelectorProps) => {
  const today = getToday();
  const selectedDate =
    date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

  const parseDateString = (dateString: String): Date => {
    const [year, month, day] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in Date constructor
  };

  const handleDateChange = (newDate: String) => {
    const parsedDate = parseDateString(newDate);
    setDate(parsedDate);
  };

  return (
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
  );
};

export default DateSelector;
