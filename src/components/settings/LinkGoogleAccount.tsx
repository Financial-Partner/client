import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';

type LinkGoogleAccountProps = {
  linking: boolean;
  onLink: () => void;
  email?: string | null;
};

const LinkGoogleAccount: React.FC<LinkGoogleAccountProps> = ({ linking, onLink, email }) => {
  return (
    <View style={styles.linkSection}>
      <Text style={styles.sectionTitle}>連結其他登入方式</Text>
      <Pressable
        style={({ pressed }) => [styles.linkButton, pressed && styles.buttonPressed]}
        onPress={onLink}
        disabled={linking}
      >
        {linking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.linkText}>連結 Google 帳號</Text>
        )}
      </Pressable>
      <Text style={styles.linkHint}>* 請使用相同的電子郵件地址 ({email})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  linkSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  linkButton: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonPressed: {
    backgroundColor: colors.pressedBackground,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  linkHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LinkGoogleAccount;
