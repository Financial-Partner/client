export interface Character {
  id: string;
  imageUrl: string;
  message?: string;
}

export interface CharacterInventory {
  characterId: string;
  quantity: number;
  obtainedAt: Date;
  message: string;
}
