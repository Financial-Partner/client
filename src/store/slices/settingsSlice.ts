import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';

interface SettingsState {
  setupDone: boolean;
  selectedDino: string | null;
  monthlyIncome: string | null;
  monthlySaving: string | null;
  currentSaving: string | null;
}

const initialState: SettingsState = {
  setupDone: false,
  selectedDino: null,
  monthlyIncome: null,
  monthlySaving: null,
  currentSaving: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSetupDone: (state, action: PayloadAction<boolean>) => {
      state.setupDone = action.payload;
    },
    setSelectedDino: (state, action: PayloadAction<string>) => {
      state.selectedDino = action.payload;
    },
    setMonthlyIncome: (state, action: PayloadAction<string>) => {
      state.monthlyIncome = action.payload;
    },
    setMonthlySaving: (state, action: PayloadAction<string>) => {
      state.monthlySaving = action.payload;
    },
    setCurrentSaving: (state, action: PayloadAction<string>) => {
      state.currentSaving = action.payload;
    },
    clearSettings: state => {
      state.setupDone = false;
      state.selectedDino = null;
      state.monthlyIncome = null;
      state.monthlySaving = null;
      state.currentSaving = null;
    },
  },
});

export const {
  setSetupDone,
  setSelectedDino,
  setMonthlyIncome,
  setMonthlySaving,
  setCurrentSaving,
  clearSettings,
} = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
