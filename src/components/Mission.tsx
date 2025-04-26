import {StyleSheet, View, Text, Platform} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Diamond} from '../svg';
import type {Mission as MissionType} from '../store/slices/missionSlice';

type MissionProps = {
  mission: MissionType;
  diamonds: number;
};

const Mission = ({mission}: MissionProps) => {
  return (
    <View style={styles.mission}>
      <View style={styles.missionLeft}>
        <View style={styles.checkbox}>
          <BouncyCheckbox
            isChecked={mission.isCompleted}
            useBuiltInState={true}
            size={18}
            disableText={true}
            fillColor="#007BFF"
            unFillColor="#FFFFFF"
            iconStyle={styles.checkboxIcon}
            disabled={true}
          />
        </View>
        <Text
          style={[
            styles.missionTitle,
            mission.isCompleted && styles.completedMission,
          ]}>
          {mission.title}
        </Text>
      </View>
      <View style={styles.missionReward}>
        <Diamond width={20} height={20} />
        <Text style={styles.rewardAmount}>{mission.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mission: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  missionTitle: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  completedMission: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  missionText: {
    fontSize: 14,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxIcon: {
    borderColor: '#007BFF',
  },
  missionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  missionReward: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  rewardAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Mission;
