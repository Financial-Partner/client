import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  radioType: 'typeSelector' | 'durationSelector';
};

const RadioButton = ({
  label,
  selected,
  onPress,
  radioType,
}: RadioButtonProps) => {
  const getRadioTypeStyle = () => {
    switch (radioType) {
      case 'typeSelector':
        return styles.type1;
      case 'durationSelector':
        return styles.type2;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.radioButton,
        getRadioTypeStyle(),
        selected && styles.selectedButton,
      ]}
      onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    paddingVertical: 3,
    alignContent: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '99%',
  },
  selectedButton: {
    backgroundColor: '#BCD635',
  },
  type1: {
    width: '33%',
    borderRadius: 5,
  },
  type2: {
    width: '25%',
  },
});

export default RadioButton;
