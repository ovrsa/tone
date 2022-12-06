import SignUp from '@components/SignUp'
import { auth } from '@lib/firebase';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthProvider } from '../context/AuthContext';

const signup = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {/* ログイン状態を反映させるためにAuthProviderでSignUpコンポーネントを囲う必要がある */}
      <SignUp />
    </>
  )
}
export default signup