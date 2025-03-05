import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

const SocialAuth = ({googleSignIn}: {googleSignIn: () => Promise<void>}) => {
  return (
    <View>
      <Text style={styles.dividerText}>或</Text>
      <Pressable style={styles.socialButton} onPress={googleSignIn}>
        <Text style={styles.socialText}>使用 Google 登入</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dividerText: {
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialText: {
    color: colors.text,
    textAlign: 'center',
  },
});

export default SocialAuth;
