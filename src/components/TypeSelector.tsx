import React, {useState} from 'react';
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

const TypeSelector = () => {
  const [selectedType, setSelectedType] = useState<String>('收入');
  const types = ['收入', '支出', '結餘'];

  return (
    <View style={styles.typeSelector}>
      {types.map((option, index) => (
        <RadioButton
          key={index}
          label={option}
          selected={selectedType === option}
          onPress={() => setSelectedType(option)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 5,
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

export default TypeSelector;
