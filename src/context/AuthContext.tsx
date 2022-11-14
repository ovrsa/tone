// firebaseでログイン状態を管理をする際の記述
// useContextを使用し、全てのコンポーネントでユーザー情報の共有
import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../hooks/firebase';

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const value = {
    user,
  };

  useEffect(() => {
    // AuthContext.jsファイルの中でユーザがサインイン、サインアウトを監視するメソッドonAuthStateChangedを設定
    // FirebaseではリスナーとしてonAuthStateChangedはサインイン、サインアウトが行われると実行され、
    // サインインの場合はuserオブジェクトにuserに関する値を持ち、サインアウトの場合はnullとなる
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    //アンマウント時に行うリスナーの削除処理はreturn unsubscribedと記述することができる
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}