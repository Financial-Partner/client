import {useAppDispatch, useAppSelector} from '../store';
import {missionSlice, Mission} from '../store/slices/missionSlice';
import {settingsSlice} from '../store/slices/settingsSlice';

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

export const missionService = {
  getMissions: async (): Promise<Mission[]> => {
    return defaultMissions;
  },

  updateMissionStatus: async (
    missionId: string,
    isCompleted: boolean,
    currentMissions: Mission[],
  ) => {
    const mission = currentMissions.find(m => m.id === missionId);

    if (!mission) {
      return currentMissions;
    }

    // Only update if the mission is being completed and wasn't completed before
    if (isCompleted && !mission.isCompleted) {
      return currentMissions.map(m =>
        m.id === missionId ? {...m, isCompleted: true} : m,
      );
    }

    return currentMissions.map(m =>
      m.id === missionId ? {...m, isCompleted} : m,
    );
  },

  initializeMissions: async () => {
    const store = require('../store').store;
    store.dispatch(missionSlice.actions.setMissions(defaultMissions));
    return defaultMissions;
  },
};

export const useMissions = () => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector(state => state.missions.missions);

  const updateMission = async (missionId: string, isCompleted: boolean) => {
    // Get current mission state
    const currentMission = missions.find(m => m.id === missionId);

    if (!currentMission) {
      return missions;
    }

    // Only proceed if the mission exists and is being completed for the first time
    if (isCompleted && !currentMission.isCompleted) {
      const updatedMissions = await missionService.updateMissionStatus(
        missionId,
        isCompleted,
        missions,
      );
      dispatch(missionSlice.actions.setMissions(updatedMissions));

      // Add diamonds for completing the mission
      dispatch(settingsSlice.actions.addDiamonds(currentMission.amount));

      return updatedMissions;
    }

    // If mission is already completed or not being completed, just update the status
    const updatedMissions = await missionService.updateMissionStatus(
      missionId,
      isCompleted,
      missions,
    );
    dispatch(missionSlice.actions.setMissions(updatedMissions));
    return updatedMissions;
  };

  const initializeMissions = async () => {
    const initialMissions = await missionService.initializeMissions();
    dispatch(missionSlice.actions.setMissions(initialMissions));
    return initialMissions;
  };

  return {
    missions,
    updateMission,
    initializeMissions,
  };
};
