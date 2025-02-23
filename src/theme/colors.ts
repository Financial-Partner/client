export const colors = {
  background: '#FFCA96',
  primary: '#000000',
  text: '#000000',
  textSecondary: '#666666',
  error: '#FF0000',
  border: '#000000',
  diamond: '#FFFF15',
  moneyBackground: '#8E8989',
  pressedBackground: '#f0f0f0',
  borderColor: '#eee',
} as const;

export type ColorKeys = keyof typeof colors; 