import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

type AccountInfoProps = {
  email?: string | null;
};

const AccountInfo: React.FC<AccountInfoProps> = ({email}) => {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.label}>電子郵件</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.text,
  },
});

export default AccountInfo;
