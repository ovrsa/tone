import SignUpContent from '@components/SignUpContent'
import { auth } from '@lib/firebase';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { AuthProvider } from '../context/AuthContext';

const Signup = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {/* ログイン状態を反映させるためにAuthProviderでSignUpコンポーネントを囲う必要がある */}
      <SignUpContent />
    </>
  )
}
export default Signup