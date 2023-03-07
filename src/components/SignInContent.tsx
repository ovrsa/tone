import { userItemState } from '@atoms/atom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Center,
  Text,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { auth, provider } from '@lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup, User
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRecoilState } from 'recoil';

interface UserItem {
  email: string;
  uid: string;
}

export default function Signin() {
  const [userItem, setUserItem] = useRecoilState<UserItem>(userItemState);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  // SignIn処理
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.querySelector('input[name="email"]') as HTMLInputElement).value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // ユーザー情報取得処理しuserItemへ格納
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { email, uid } = user as User;
            //  email の後に ?? '' を付けることで、email が null の場合には空の文字列に置き換える
            setUserItem({ ...userItem, email: email ?? '', uid });
          }
        });
        router.push('../Tasks/All'); // ログイン成功時にTasks/Allページに遷移
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const _user = result.user;
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { email, uid } = user as User;
            //  email の後に ?? '' を付けることで、email が null の場合には空の文字列に置き換える
            setUserItem({ ...userItem, email: email ?? '', uid });
          }
        });
        router.push('../Tasks/All'); // ログイン成功時にTasks/Allページに遷移
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // useStateにセット
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  // テストアカウントでログインする処理
  const handleTestAccountSignIn = () => {
    const email = 'test@test.com';
    const password = 'Test1234';
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const _user = userCredential.user;
        // ユーザー情報取得処理しuserItemへ格納
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { email, uid } = user as User;
            //  email の後に ?? '' を付けることで、email が null の場合には空の文字列に置き換える
            setUserItem({ ...userItem, email: email ?? '', uid });
          }
        });
        router.push('../Tasks/All');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('whiteAlpha.700', 'gray.700')}
          boxShadow={'lg'}
          w={'450px'}
          p={8}
        >
          <form onSubmit={handleSignIn}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" />
              </FormControl>  
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChangePassword}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'center'}
                justify={'space-between'}
              >
              </Stack>

              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Center>
                <Button
                  w={'full'}
                  maxW={'md'}
                  variant={'outline'}
                  leftIcon={<FcGoogle />}
                  onClick={handleSignInWithGoogle}>
                  <Center>
                    <Text>Sign In with Google</Text>
                  </Center>
                </Button>
              </Center>

              <Center>
                <Button
                  onClick={() => {
                    router.push('/signup');
                  }}
                  variant="unstyled"
                  color={'blue.400'}
                >
                  新規登録
                </Button>
              </Center>
              <Button variant="unstyled" color={'blue.400'} onClick={handleTestAccountSignIn}>
                テストアカウントでログイン
              </Button>
            </Stack>
          </form>

        </Box>
      </Stack>
    </Flex>
  );
}