import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  token: string | null;
  skipAuth: boolean;
} 