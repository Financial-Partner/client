export const colors = {
  background: '#FFCA96',
  diamond: '#FFFF15',
  text: '#000000',
  textSecondary: '#666666',
  moneyBackground: '#8E8989',
  pressedBackground: '#f0f0f0',
  borderColor: '#eee',
} as const;

export type ColorKeys = keyof typeof colors; 