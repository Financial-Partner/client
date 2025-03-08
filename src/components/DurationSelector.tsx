import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const RadioButton = ({label, selected, onPress}: RadioButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.radioButton, selected && styles.selectedButton]}
      onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

type DurationSelectorProps = {
  duration: String;
  setDuration: (mode: String) => void;
};

const DurationSelector = ({duration, setDuration}: DurationSelectorProps) => {
  // const durations = ['一個月', '半年', '一年', '自訂'];
  const durations = ['一個月', '半年', '一年'];

  return (
    <View style={styles.durationContainer}>
      {durations.map((option, index) => (
        <RadioButton
          key={index}
          label={option}
          selected={duration === option}
          onPress={() => setDuration(option)}
        />
      ))}
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
});

export default DurationSelector;
