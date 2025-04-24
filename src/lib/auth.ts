
import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';

export type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);
