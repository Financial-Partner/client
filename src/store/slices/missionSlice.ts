import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';

export interface Mission {
  id: string;
  title: string;
  amount: number;
  isCompleted: boolean;
}

interface MissionState {
  missions: Mission[];
}

const initialState: MissionState = {
  missions: [],
};

export const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setMissions: (state, action: PayloadAction<Mission[]>) => {
      state.missions = action.payload;
    },
    addMission: (state, action: PayloadAction<Mission>) => {
      state.missions.push(action.payload);
    },
    updateMission: (state, action: PayloadAction<Mission>) => {
      const index = state.missions.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.missions[index] = action.payload;
      }
    },
    clearMissions: state => {
      state.missions = [];
    },
  },
});

export const {setMissions, addMission, updateMission, clearMissions} =
  missionSlice.actions;

export const selectMissions = (state: RootState) => state.missions.missions;

export default missionSlice.reducer;
