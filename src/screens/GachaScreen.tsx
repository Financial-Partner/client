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

const GACHA_COST = 1000;

const characterImages = {
  blue_1: require('../assets/characters/blue_1.png'),
  blue_2: require('../assets/characters/blue_2.png'),
  green_1: require('../assets/characters/green_1.png'),
  green_2: require('../assets/characters/green_2.png'),
  green_3: require('../assets/characters/green_3.png'),
  pink_1: require('../assets/characters/pink_1.png'),
  yellow_1: require('../assets/characters/yellow_1.png'),
  yellow_2: require('../assets/characters/yellow_2.png'),
  main_character: require('../assets/characters/main_character.png'),
};

const GachaScreen = () => {
  const dispatch = useDispatch();
  const allCharacters = useSelector(selectAllCharacters);
  const {diamonds} = useAppSelector(state => state.settings);
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
      Alert.alert('鑽石不足', '需要 100 鑽石才能抽卡');
      return;
    }

    setIsSpinning(true);
    setShowResult(false);

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
      // Stop spinning
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
                source={characterImages.main_character}
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
                source={
                  characterImages[result.id as keyof typeof characterImages] ||
                  characterImages.main_character
                }
                style={styles.resultImage}
                resizeMode="contain"
              />
              <Text style={styles.resultText}>恭喜獲得！</Text>
            </Animated.View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Image
                source={characterImages.main_character}
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
          <Text style={styles.buttonText}>
            {isSpinning ? '抽卡中...' : '抽卡'}
            {!isSpinning && (
              <>
                <Diamond height={16} width={16} style={styles.diamond} />
                <Text style={styles.buttonText}>1,000</Text>
              </>
            )}
          </Text>
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  diamond: {
    marginRight: 5,
  },
});

export default GachaScreen;
