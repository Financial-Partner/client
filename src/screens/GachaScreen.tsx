import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../components/Layout';
import {selectAllCharacters} from '../store/selectors/characterSelectors';
import {addToInventory} from '../store/slices/characterSlice';
import {Character} from '../types/character';
import {useAppSelector} from '../store';
import {setDiamonds} from '../store/slices/settingsSlice';
import {Diamond} from '../svg';
import {getCharacterImage} from '../constants/characterImages';

const GACHA_COST = 1000;

const GachaScreen = () => {
  const dispatch = useDispatch();
  const allCharacters = useSelector(selectAllCharacters);
  const {diamonds} = useAppSelector(state => state.settings);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Character | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Animation values
  const spinValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(1);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleGacha = () => {
    if (isSpinning) {
      return;
    }
    if (diamonds < GACHA_COST) {
      Alert.alert('鑽石不足', '需要 1000 鑽石才能抽卡');
      return;
    }

    setIsSpinning(true);
    setShowResult(false);
    setCurrentCharacterIndex(0);

    // Start character rotation animation
    const characterInterval = setInterval(() => {
      setCurrentCharacterIndex(prev => (prev + 1) % allCharacters.length);
    }, 100);

    // Start spinning animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Simulate gacha process
    setTimeout(() => {
      // Stop spinning and character rotation
      clearInterval(characterInterval);
      spinValue.stopAnimation();
      spinValue.setValue(0);

      // Randomly select a character
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      const selectedCharacter = allCharacters[randomIndex];

      // Add to inventory and deduct diamonds
      dispatch(addToInventory(selectedCharacter.id));
      dispatch(setDiamonds(diamonds - GACHA_COST));

      // Show result with animation
      setResult(selectedCharacter);
      setShowResult(true);
      setIsSpinning(false);

      // Pop animation
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000); // 3 seconds spinning
  };

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <Text style={styles.title}>抽卡</Text>

        <View style={styles.gachaContainer}>
          {isSpinning ? (
            <Animated.View
              style={[styles.spinningContainer, {transform: [{rotate: spin}]}]}>
              <Image
                source={getCharacterImage(
                  allCharacters[currentCharacterIndex].id,
                )}
                style={styles.spinningImage}
                resizeMode="contain"
              />
            </Animated.View>
          ) : showResult && result ? (
            <Animated.View
              style={[
                styles.resultContainer,
                {transform: [{scale: scaleValue}]},
              ]}>
              <Image
                source={getCharacterImage(result.id)}
                style={styles.resultImage}
                resizeMode="contain"
              />
              <Text style={styles.resultText}>恭喜獲得！</Text>
            </Animated.View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Image
                source={getCharacterImage('main_character')}
                style={styles.placeholderImage}
                resizeMode="contain"
              />
              <Text style={styles.placeholderText}>點擊下方按鈕開始抽卡</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.gachaButton,
            (isSpinning || diamonds < GACHA_COST) && styles.disabledButton,
          ]}
          onPress={handleGacha}
          disabled={isSpinning || diamonds < GACHA_COST}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              {isSpinning ? '抽卡中...' : '抽卡'}
            </Text>
            {!isSpinning && (
              <View style={styles.costContainer}>
                <Diamond height={16} width={16} style={styles.diamond} />
                <Text style={styles.buttonText}>1,000</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  diamondInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  diamondText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  costText: {
    fontSize: 16,
    color: '#666',
  },
  gachaContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  spinningContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinningImage: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#007BFF',
  },
  placeholderContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  placeholderText: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  gachaButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  diamond: {
    marginRight: 5,
  },
});

export default GachaScreen;
