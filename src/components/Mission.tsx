import {StyleSheet, View, Text} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Diamond} from '../svg';
import {Mission as MissionType} from '../api/missionService';

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
            useBuiltInState={false}
            size={18}
            disableText={true}
          />
        </View>
        <Text style={styles.missionTitle}>{mission.title}</Text>
      </View>
      <View style={styles.missionReward}>
        <Diamond width={20} height={20} />
        <Text>{mission.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mission: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
  },
  missionTitle: {
    fontSize: 14,
  },
  missionText: {
    fontSize: 14,
  },
  checkbox: {
    marginRight: 10,
  },
  missionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  missionReward: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Mission;
