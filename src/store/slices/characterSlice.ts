import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character, CharacterInventory} from '../../types/character';

interface CharacterState {
  characters: Character[];
  inventory: CharacterInventory[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  characters: [
    {
      id: 'blue_1',
      imageUrl: '/assets/characters/blue_1.png',
    },
    {
      id: 'blue_2',
      imageUrl: '/assets/characters/blue_2.png',
    },
    {
      id: 'green_1',
      imageUrl: '/assets/characters/green_1.png',
    },
    {
      id: 'green_2',
      imageUrl: '/assets/characters/green_2.png',
    },
    {
      id: 'green_3',
      imageUrl: '/assets/characters/green_3.png',
    },
    {
      id: 'pink_1',
      imageUrl: '/assets/characters/pink_1.png',
    },
    {
      id: 'yellow_1',
      imageUrl: '/assets/characters/yellow_1.png',
    },
    {
      id: 'yellow_2',
      imageUrl: '/assets/characters/yellow_2.png',
    },
  ],
  inventory: [],
  isLoading: false,
  error: null,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    addToInventory: (state, action: PayloadAction<string>) => {
      const characterId = action.payload;
      const existingItem = state.inventory.find(
        item => item.characterId === characterId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.inventory.push({
          characterId,
          quantity: 1,
          obtainedAt: new Date(),
        });
      }
    },
    removeFromInventory: (state, action: PayloadAction<string>) => {
      const characterId = action.payload;
      const existingItem = state.inventory.find(
        item => item.characterId === characterId,
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.inventory = state.inventory.filter(
            item => item.characterId !== characterId,
          );
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {addToInventory, removeFromInventory, setLoading, setError} =
  characterSlice.actions;
export default characterSlice.reducer;
