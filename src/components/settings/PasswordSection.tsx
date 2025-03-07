import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

type PasswordSectionProps = {
  onPress: () => void;
};

const PasswordSection: React.FC<PasswordSectionProps> = ({onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.settingButton,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}>
      <Text style={styles.settingText}>修改密碼</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  settingButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonPressed: {
    backgroundColor: colors.pressedBackground,
  },
  settingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PasswordSection;
