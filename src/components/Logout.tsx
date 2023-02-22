import { auth } from '@lib/firebase';
import { useRecoilState } from 'recoil';
import { isLoginState, userItemState } from '@atoms/atom';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

const Logout = () => {
  const [_isLogin, setIsLogin] = useRecoilState<boolean>(isLoginState);
  const [_userItem, setUserItem] = useRecoilState<any>(userItemState);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    setIsLogin(false);
    setUserItem({});
    router.push('/');
  };

  return (
    <>
      <Button
        ml={2}
        variant='unstyled'
        onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}

export default Logout;
