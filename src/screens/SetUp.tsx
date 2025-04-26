import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../contexts/AuthContext';
import {useAppDispatch} from '../store';
import {settingsSlice} from '../store/slices/settingsSlice';
import {colors} from '../theme/colors';
import {useDispatch} from 'react-redux';
import {addToInventory} from '../store/slices/characterSlice';
import {characters} from '../constants/characters';

type RootStackParamList = {
  MainTabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SetUp = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [monthlySaving, setMonthlySaving] = useState('');
  const [selectedDino, setSelectedDino] = useState<any>(null);
  const [petMessage, setPetMessage] = useState(
    '嗨！我是你的理財小助手。讓我們一起設定你的理財目標吧！',
  );
  const navigation = useNavigation<NavigationProp>();
  const {user} = useAuth();
  const dispatch = useAppDispatch();
  const redDispatch = useDispatch();

  const handleNumberInput = (
    value: string,
    setter: (value: string) => void,
  ) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const suggestSavingGoal = () => {
    const income = parseInt(monthlyIncome, 10) || 0;
    const expense = parseInt(monthlyExpense, 10) || 0;

    if (income === 0) {
      setPetMessage('請先輸入你的每月收入，我才能幫你計算合適的存錢目標喔！');
      return;
    }

    if (expense === 0) {
      setPetMessage('請先輸入你的每月支出，我才能幫你計算合適的存錢目標喔！');
      return;
    }

    if (expense >= income) {
      setPetMessage(
        '你的支出似乎超過收入了，建議先調整支出，讓收支平衡比較好喔！',
      );
      return;
    }

    const availableAmount = income - expense;
    const expenseRatio = expense / income;

    // 根據支出比例決定存錢比例
    let savingRatio;
    if (expenseRatio <= 0.3) {
      savingRatio = 0.6; // 支出比例低時，建議存較多
    } else if (expenseRatio <= 0.5) {
      savingRatio = 0.5; // 支出比例適中時，建議存一半
    } else if (expenseRatio <= 0.7) {
      savingRatio = 0.4; // 支出比例偏高時，建議存較少
    } else {
      savingRatio = 0.3; // 支出比例高時，建議存最少
    }

    // 在建議比例的基礎上隨機增減 10%
    const randomFactor = 0.9 + Math.random() * 0.2; // 0.9 到 1.1 之間的隨機數
    const suggestedAmount = Math.floor(
      availableAmount * savingRatio * randomFactor,
    );
    const roundedAmount = Math.floor(suggestedAmount / 100) * 100;
    const remainingAmount = availableAmount - roundedAmount;
    const savingRatioPercent = (roundedAmount / income) * 100;

    setMonthlySaving(roundedAmount.toString());

    let message = '';
    if (savingRatioPercent >= 40) {
      message = `太棒了！建議每月存 ${roundedAmount.toLocaleString()} 元（收入的 ${Math.round(
        savingRatioPercent,
      )}%），這樣可以快速累積財富！剩下的 ${remainingAmount.toLocaleString()} 元足夠應付日常開銷和意外支出。`;
    } else if (savingRatioPercent >= 30) {
      message = `建議每月存 ${roundedAmount.toLocaleString()} 元（收入的 ${Math.round(
        savingRatioPercent,
      )}%），這是個不錯的存錢比例！剩下的 ${remainingAmount.toLocaleString()} 元可以靈活運用。`;
    } else if (savingRatioPercent >= 20) {
      message = `建議每月存 ${roundedAmount.toLocaleString()} 元（收入的 ${Math.round(
        savingRatioPercent,
      )}%），雖然存錢比例不高，但也是個好的開始！剩下的 ${remainingAmount.toLocaleString()} 元要好好規劃使用喔。`;
    } else {
      message = `建議每月存 ${roundedAmount.toLocaleString()} 元（收入的 ${Math.round(
        savingRatioPercent,
      )}%），存錢比例偏低，建議考慮增加收入或減少支出，讓存錢比例提高到至少 20%！`;
    }

    setPetMessage(message);
  };

  const suggestFinancialGoal = () => {
    const saving = parseInt(monthlySaving, 10) || 0;

    if (saving === 0) {
      setPetMessage('請先設定每月存錢目標，我才能幫你規劃合適的理財目標喔！');
      return;
    }

    const goals = [
      `存到第一桶金 ${(saving * 12).toLocaleString()} 元！`,
      `建立緊急預備金 ${(saving * 6).toLocaleString()} 元！`,
      `投資理財基金 ${(saving * 24).toLocaleString()} 元！`,
      `為夢想存錢 ${(saving * 36).toLocaleString()} 元！`,
    ];

    const randomGoal = goals[Math.floor(Math.random() * goals.length)];
    setGoal(randomGoal);
    setPetMessage(
      `我建議你可以設定「${randomGoal}」作為你的理財目標，這樣可以讓你的存錢更有方向！`,
    );
  };

  // Mock data for pet images
  const dinosaurs = characters;

  const handleNext = async () => {
    if (step === 1) {
      if (selectedDino) {
        redDispatch(addToInventory(selectedDino.imageKey));
        setStep(2);
      }
    } else if (step === 2) {
      if (
        goal.trim().length > 0 &&
        monthlyIncome.trim().length > 0 &&
        monthlyExpense.trim().length > 0 &&
        monthlySaving.trim().length > 0 &&
        user?.uid
      ) {
        const trimmedMonthlyIncome = monthlyIncome.trim();
        const trimmedMonthlySaving = monthlySaving.trim();

        dispatch(settingsSlice.actions.setSetupDone(true));
        dispatch(settingsSlice.actions.setSelectedDino(selectedDino.imageKey));
        dispatch(settingsSlice.actions.setMonthlyIncome(trimmedMonthlyIncome));
        dispatch(settingsSlice.actions.setMonthlySaving(trimmedMonthlySaving));
        navigation.reset({index: 0, routes: [{name: 'MainTabs'}]});
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  // Progress: 50% at step 1, 100% at step 2
  const progressValue = step === 1 ? 0.5 : 1.0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={[styles.stepContainer]}>
          {step === 1 ? (
            <View style={styles.stepContent}>
              <Text style={styles.title}>選擇一個萌寵</Text>
              <View style={styles.dinosContainer}>
                {dinosaurs.map(dino => (
                  <TouchableOpacity
                    key={dino.id}
                    style={[
                      styles.dinoItem,
                      selectedDino?.id === dino.id && styles.selectedDinoItem,
                    ]}
                    onPress={() => setSelectedDino(dino)}>
                    <Image source={dino.image} style={styles.dinoImage} />
                    <Text style={styles.dinoName}>{dino.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <ScrollView
              style={styles.stepContent}
              contentContainerStyle={styles.scrollContentContainer}>
              <View style={styles.petDialogueContainer}>
                <Image source={selectedDino.image} style={styles.petImage} />
                <View style={styles.dialogueBubble}>
                  <Text style={styles.dialogueText}>{petMessage}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  step === 2 && styles.inputContainerStep2,
                ]}>
                <Text style={styles.inputLabel}>每月收入</Text>
                <TextInput
                  style={styles.input}
                  placeholder="請輸入你的每月收入"
                  placeholderTextColor="#666"
                  value={
                    monthlyIncome
                      ? `NT$ ${parseInt(monthlyIncome, 10).toLocaleString()}`
                      : ''
                  }
                  onChangeText={value =>
                    handleNumberInput(value, setMonthlyIncome)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  step === 2 && styles.inputContainerStep2,
                ]}>
                <Text style={styles.inputLabel}>每月支出</Text>
                <TextInput
                  style={styles.input}
                  placeholder="請輸入你的每月支出"
                  placeholderTextColor="#666"
                  value={
                    monthlyExpense
                      ? `NT$ ${parseInt(monthlyExpense, 10).toLocaleString()}`
                      : ''
                  }
                  onChangeText={value =>
                    handleNumberInput(value, setMonthlyExpense)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  step === 2 && styles.inputContainerStep2,
                ]}>
                <Text style={styles.inputLabel}>每月存錢目標</Text>
                <TextInput
                  style={styles.input}
                  placeholder="請輸入你的每月存錢目標"
                  placeholderTextColor="#666"
                  value={
                    monthlySaving
                      ? `NT$ ${parseInt(monthlySaving, 10).toLocaleString()}`
                      : ''
                  }
                  onChangeText={value =>
                    handleNumberInput(value, setMonthlySaving)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.suggestButton}
                  onPress={suggestSavingGoal}>
                  <Text style={styles.suggestButtonText}>建議存錢目標</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.suggestButton}
                  onPress={suggestFinancialGoal}>
                  <Text style={styles.suggestButtonText}>建議理財目標</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Progress.Bar progress={progressValue} width={null} />
        <View style={styles.buttonRow}>
          {step === 2 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>上一步</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.nextButton, step === 2 && styles.nextButtonStep2]}
            onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {step === 1 ? '下一步' : '完成'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.select({
      android: StatusBar.currentHeight,
      ios: 44, // iOS 的安全區域高度
    }),
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    flex: 1,
    width: '100%',
  },
  stepContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dinosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  dinoItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedDinoItem: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  dinoImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  dinoName: {
    marginTop: 5,
    fontSize: 14,
  },
  petDialogueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  dialogueBubble: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 15,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dialogueText: {
    fontSize: 16,
    lineHeight: 24,
  },
  inputContainer: {
    width: '100%',
  },
  inputContainerStep2: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  suggestButton: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  suggestButtonText: {
    color: '#2196f3',
    textAlign: 'center',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    width: '48%',
  },
  backButtonText: {
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  nextButtonStep2: {
    width: '48%',
  },
  nextButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SetUp;
