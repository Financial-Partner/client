import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../theme/colors';
import {useAuth} from '../../contexts/AuthContext';

const TokenExchangeError = () => {
  const {tokenExchangeError, retryTokenExchange, signOut} = useAuth();
  const [retrying, setRetrying] = React.useState(false);

  if (!tokenExchangeError) {return null;}

  const handleRetry = async () => {
    setRetrying(true);
    try {
      const success = await retryTokenExchange();
      if (!success) {
      }
    } catch (error) {
      console.error('重試失敗:', error);
    } finally {
      setRetrying(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <Text style={styles.title}>伺服器連線問題</Text>
        <Text style={styles.message}>
          已成功登入，但無法與伺服器建立連線。這可能是暫時性的問題，你可以嘗試重試或登出。
        </Text>
        <Text style={styles.errorDetails}>{tokenExchangeError}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={handleRetry}
            disabled={retrying}>
            {retrying ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>重試連線</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signOutButton]}
            onPress={signOut}>
            <Text style={styles.buttonText}>登出</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  errorBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.error,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.text,
  },
  errorDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  retryButton: {
    backgroundColor: colors.primary,
  },
  signOutButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TokenExchangeError;
