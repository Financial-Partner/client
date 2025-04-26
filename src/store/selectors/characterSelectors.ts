import {RootState} from '../store';
import {Character, CharacterInventory} from '../../types/character';

export const selectAllCharacters = (state: RootState): Character[] =>
  state.character.characters;

export const selectCharacterById = (
  state: RootState,
  id: string,
): Character | undefined =>
  state.character.characters.find(
    (character: Character) => character.id === id,
  );

export const selectInventory = (state: RootState): CharacterInventory[] =>
  state.character.inventory;

export const selectInventoryItem = (
  state: RootState,
  characterId: string,
): CharacterInventory | undefined =>
  state.character.inventory.find(
    (item: CharacterInventory) => item.characterId === characterId,
  );

export const selectCharacterWithInventory = (
  state: RootState,
): (Character & {quantity: number})[] => {
  return state.character.inventory
    .map((inventoryItem: CharacterInventory) => {
      const character = state.character.characters.find(
        (c: Character) => c.id === inventoryItem.characterId,
      );
      if (!character) {return null;}
      return {
        ...character,
        quantity: inventoryItem.quantity,
      };
    })
    .filter((item): item is Character & {quantity: number} => item !== null);
};
