import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Mission {
  id: string;
  title: string;
  amount: number;
  isCompleted: boolean;
}

const MISSIONS_STORAGE_KEY = 'user_missions';

export const missionService = {
  getMissions: async (): Promise<Mission[]> => {
    try {
      const storedMissions = await AsyncStorage.getItem(MISSIONS_STORAGE_KEY);
      return storedMissions ? JSON.parse(storedMissions) : [];
    } catch (error) {
      console.error('Error getting missions:', error);
      return [];
    }
  },

  updateMissionStatus: async (missionId: string, isCompleted: boolean) => {
    try {
      const missions = await missionService.getMissions();
      const updatedMissions = missions.map(mission =>
        mission.id === missionId ? {...mission, isCompleted} : mission,
      );
      await AsyncStorage.setItem(
        MISSIONS_STORAGE_KEY,
        JSON.stringify(updatedMissions),
      );
      return updatedMissions;
    } catch (error) {
      console.error('Error updating mission status:', error);
      throw error;
    }
  },

  initializeMissions: async () => {
    const defaultMissions: Mission[] = [
      {
        id: 'transaction',
        title: '輸入交易紀錄',
        amount: 5000,
        isCompleted: false,
      },
      {
        id: 'income',
        title: '添加額外收入',
        amount: 500,
        isCompleted: false,
      },
      {
        id: 'budget',
        title: '設定預算',
        amount: 2000,
        isCompleted: true,
      },
      {
        id: 'saving',
        title: '設定目標存款',
        amount: 3000,
        isCompleted: true,
      },
    ];

    try {
      await AsyncStorage.setItem(
        MISSIONS_STORAGE_KEY,
        JSON.stringify(defaultMissions),
      );
      return defaultMissions;
    } catch (error) {
      console.error('Error initializing missions:', error);
      throw error;
    }
  },
};
