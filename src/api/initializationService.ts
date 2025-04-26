import {store} from '../store';
import {missionService} from './missionService';
import {missionSlice} from '../store/slices/missionSlice';

export const initializationService = {
  initializeApp: async () => {
    try {
      // Check if missions exist in store
      const state = store.getState();
      console.log('Current missions in store:', state.missions.missions);

      if (!state.missions.missions || state.missions.missions.length === 0) {
        // If no missions, set default missions
        const defaultMissions = await missionService.getMissions();
        console.log('Setting default missions:', defaultMissions);
        store.dispatch(missionSlice.actions.setMissions(defaultMissions));
      }

      // Check missions completion
      const {missions, transactions} = store.getState();
      console.log('Missions after initialization:', missions.missions);

      // Check transaction mission
      const hasTransactions = transactions.transactions.length > 0;
      const transactionMission = missions.missions.find(
        m => m.id === 'transaction',
      );
      if (
        hasTransactions &&
        transactionMission &&
        !transactionMission.isCompleted
      ) {
        const updatedMissions = await missionService.updateMissionStatus(
          'transaction',
          true,
          missions.missions,
        );
        store.dispatch(missionSlice.actions.setMissions(updatedMissions));
      }

      // Check income mission
      const hasIncome = transactions.transactions.some(
        t => t.type === 'INCOME' && t.amount >= 500,
      );
      const incomeMission = missions.missions.find(m => m.id === 'income');
      if (hasIncome && incomeMission && !incomeMission.isCompleted) {
        const updatedMissions = await missionService.updateMissionStatus(
          'income',
          true,
          missions.missions,
        );
        store.dispatch(missionSlice.actions.setMissions(updatedMissions));
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  },

  // Save user data to AsyncStorage
  saveUserData: async () => {
    try {
      const state = store.getState();
      const userData = {
        budget: state.settings.budget,
        saving: state.settings.saving,
        diamonds: state.settings.diamonds,
        selectedDino: state.settings.selectedDino,
        monthlyIncome: state.settings.monthlyIncome,
        monthlySaving: state.settings.monthlySaving,
        currentSaving: state.settings.currentSaving,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },
};
