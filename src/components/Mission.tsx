import { StyleSheet, View, Text } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

type MissionProps = {
    mission: {
        title: string;
        amount: number;
        isCompleted: boolean;
    }
};

const Mission = ({mission}: MissionProps) => {
    // const [isSelected, setSelection] = useState(false);

    return (
        <View style={styles.mission}>
            <View style={styles.missionLeft}>
                <View style={styles.checkbox}>
                    <BouncyCheckbox
                        isChecked={mission.isCompleted}
                        useBuiltInState={false}
                        // onPress={(isChecked: boolean) => {mission.isCompleted = isChecked}}
                        size={18}
                        disableText={true}
                    />
                </View>
                <Text style={styles.missionTitle}>{mission.title}</Text>
            </View>
            <Text>💰 {mission.amount}</Text>
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
    },
    missionTitle: {
        fontSize: 14,
    },
    missionText: {
        fontSize: 14,
    },
    checkbox: {
        marginRight: 5,
    },
    missionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default Mission;
