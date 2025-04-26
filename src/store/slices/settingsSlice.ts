import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../index';

interface SettingsState {
  setupDone: boolean;
  selectedDino: string | null;
  monthlyIncome: string | null;
  monthlySaving: string | null;
  currentSaving: string | null;
  diamonds: number;
  budget: number;
  saving: number;
}

const initialState: SettingsState = {
  setupDone: false,
  selectedDino: null,
  monthlyIncome: null,
  monthlySaving: null,
  currentSaving: null,
  diamonds: 5000,
  budget: 0,
  saving: 0,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return {...state, ...action.payload};
    },
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
    setDiamonds: (state, action: PayloadAction<number>) => {
      state.diamonds = action.payload;
    },
    addDiamonds: (state, action: PayloadAction<number>) => {
      state.diamonds += action.payload;
    },
    setBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload;
    },
    setSaving: (state, action: PayloadAction<number>) => {
      state.saving = action.payload;
    },
    clearSettings: state => {
      state.setupDone = false;
      state.selectedDino = null;
      state.monthlyIncome = null;
      state.monthlySaving = null;
      state.currentSaving = null;
      state.diamonds = 5000;
      state.budget = 0;
      state.saving = 0;
    },
  },
});

export const {
  setSettings,
  setSetupDone,
  setSelectedDino,
  setMonthlyIncome,
  setMonthlySaving,
  setCurrentSaving,
  setDiamonds,
  addDiamonds,
  setBudget,
  setSaving,
  clearSettings,
} = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
