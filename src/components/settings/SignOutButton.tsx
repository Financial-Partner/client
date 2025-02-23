import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type SignOutButtonProps = {
  onPress: () => void;
};

const SignOutButton: React.FC<SignOutButtonProps> = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.signOutButton, pressed && styles.buttonPressed]}
      onPress={onPress}
    >
      <Text style={styles.signOutText}>登出</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.pressedBackground,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignOutButton;
