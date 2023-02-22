// firebaseでログイン状態を管理をする際の記述
// useContextを使用し、全てのコンポーネントでユーザー情報の共有
import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../lib/firebase';

type User = {
  email?: string | null;
  uid?: string | null;
};

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
