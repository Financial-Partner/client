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

  updateMissionStatus: async (missionId: string, isCompleted: boolean) => {
    const missions = await missionService.getMissions();
    const mission = missions.find(m => m.id === missionId);

    // Only update diamonds if the mission is being completed and wasn't completed before
    if (isCompleted && mission && !mission.isCompleted) {
      return missions.map(m => (m.id === missionId ? {...m, isCompleted} : m));
    }

    return missions.map(m => (m.id === missionId ? {...m, isCompleted} : m));
  },

  initializeMissions: async () => {
    return defaultMissions;
  },
};

export const useMissions = () => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector(state => state.missions.missions);

  const updateMission = async (missionId: string, isCompleted: boolean) => {
    const updatedMissions = await missionService.updateMissionStatus(
      missionId,
      isCompleted,
    );
    dispatch(missionSlice.actions.setMissions(updatedMissions));

    // Update diamonds if mission is completed
    const mission = updatedMissions.find(m => m.id === missionId);
    if (mission && isCompleted) {
      dispatch(settingsSlice.actions.addDiamonds(mission.amount));
    }

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
