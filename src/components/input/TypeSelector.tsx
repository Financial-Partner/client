import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import RadioButton from './RadioButton';

enum Types {
  INCOME = '收入',
  EXPENSE = '支出',
  BALANCE = '結餘',
}

const TypeSelector = () => {
  const [selectedType, setSelectedType] = useState<String>('收入');
  const types = [Types.INCOME, Types.EXPENSE, Types.BALANCE];

  return (
    <View style={styles.typeSelector}>
      {types.map((option, index) => (
        <RadioButton
          key={index}
          label={option}
          selected={selectedType === option}
          onPress={() => setSelectedType(option)}
          radioType="typeSelector"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
