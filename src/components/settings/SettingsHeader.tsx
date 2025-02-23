import React from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, Platform } from 'react-native';
import { colors } from '../../theme/colors';

type SettingsHeaderProps = {
  onClose: () => void;
};

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onClose }) => {
  return (
    <View style={styles.header}>
      <Pressable
        style={({ pressed }) => [styles.closeButton, pressed && styles.buttonPressed]}
        onPress={onClose}
      >
        <Text style={styles.closeText}>關閉</Text>
      </Pressable>
      <Text style={styles.title}>設定</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.select({
      android: StatusBar.currentHeight,
      ios: 44,
    }),
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: colors.pressedBackground,
  },
  closeText: {
    fontSize: 16,
    color: colors.text,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
});

export default SettingsHeader;
