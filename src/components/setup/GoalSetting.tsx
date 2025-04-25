import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface GoalSettingProps {
  goal: string;
  onGoalChange: (goal: string) => void;
}

const GoalSetting: React.FC<GoalSettingProps> = ({goal, onGoalChange}) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.title}>設定理財目標</Text>
      <TextInput
        style={styles.input}
        placeholder="輸入你的目標"
        placeholderTextColor="#666"
        value={goal}
        onChangeText={onGoalChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default GoalSetting;
