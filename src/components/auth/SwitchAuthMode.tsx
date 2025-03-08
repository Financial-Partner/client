import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

const SwitchAuthMode = ({
  isLogin,
  onToggle,
}: {
  isLogin: boolean;
  onToggle: () => void;
}) => {
  return (
    <Pressable style={styles.switchButton} onPress={onToggle}>
      <Text style={styles.switchText}>
        {isLogin ? '還沒有帳號？註冊' : '已有帳號？登入'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  switchText: {
    color: colors.text,
    textAlign: 'center',
  },
});

export default SwitchAuthMode;
