import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { User, userItemState, isLoginState } from "../atoms/atom";
import { provider } from '@lib/firebase';
import { FcGoogle } from 'react-icons/fc';
// ↓認証した状態を持たせることの出来るhooks
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../lib/firebase';
import { useRecoilState, useSetRecoilState } from 'recoil'
import React from "react";
import db from "../lib/firebase";
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const [uid, setUid] = useRecoilState(isLoginState)
  const [userItem, setUserItem] = useRecoilState(userItemState);
  const router = useRouter()

  const handleSubmit = (event: any) => {
    // submitイベントのデフォルトの動作を停止
    event.preventDefault();
    // eventのtarget.elementsを使用してinputで入力した値を取得
    const { email, password } = event.target.elements;
    // auth.createUserWithEmailAndPasswordメソッドを使用してfirebaseにユーザー情報を登録
    createUserWithEmailAndPassword(auth, email.value, password.value)
      // 登録後、TOP画面に遷移
      .then(async (userCredential) => {
        const user = userCredential.user;
        setIsLogin(true)
        setUid(userCredential.user.uid)

        //firebaseにusersコレクション作成 setDocでuser.uidを指定してドキュメントID作成
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          timeStamp: serverTimestamp(),
          email: user.email
        });
        //ユーザー情報取得処理しuserItemへ格納
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid, email } = user as User;
            setUserItem({ ...userItem, uid, email });
          }
        });
        router.push('../Tasks/All')
      });
  };

  // useStateにセット
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  // useStateにセット
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const [user] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  onChange={(event) => handleChangeEmail(event)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(event) => handleChangePassword(event)}
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
              <Stack spacing={10} pt={2}>

                {/* CSS要調整 */}
                <button>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </button>

              </Stack>
              <Center>
                <Button
                  w={'full'}
                  maxW={'md'}
                  variant={'outline'}
                  leftIcon={<FcGoogle />}
                  onClick={signInWithGoogle}>
                  <Center>
                    <Text>Sign Up with Google</Text>
                  </Center>
                </Button>
              </Center>
              <Stack pt={6}>
                <Text align={'center'}>
                  <Link
                    color={'blue.400'}
                    href="./signin">
                    既に登録済の方
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>

        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp;