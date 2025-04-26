export interface Character {
  id: string;
  imageUrl: string;
}

export interface CharacterInventory {
  characterId: string;
  quantity: number;
  obtainedAt: Date;
}
