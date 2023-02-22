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
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { User, userItemState, isLoginState } from "../atoms/atom";
import { provider } from '@lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../lib/firebase';
import { useRecoilState, useSetRecoilState } from 'recoil'
import React from "react";
import db from "../lib/firebase";
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import usePasswordValidation from '../hooks/usePasswordValidation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const [uid, setUid] = useRecoilState(userItemState)
  const [userItem, setUserItem] = useRecoilState(userItemState);

  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const router = useRouter()
  const { errorMessage, checkPassword } = usePasswordValidation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!checkPassword(password)) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        timeStamp: serverTimestamp(),
        email: user.email
      });

      setUserItem({ uid: user.uid, email: user.email });
      router.push('../Tasks/All');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const [user] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { email, uid } = user as User;
            //  email の後に ?? '' を付けることで、email が null の場合には空の文字列に置き換える
            setUserItem({ ...userItem, email: email ?? '', uid });
            router.push('../Tasks/All');
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // テストアカウントでログインする処理
  const handleTestAccountSignIn = () => {
    const email = 'test@test.com';
    const password = 'Test1234';
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // ユーザー情報取得処理しuserItemへ格納
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { email, uid } = user as User;
            //  email の後に ?? '' を付けることで、email が null の場合には空の文字列に置き換える
            setUserItem({ ...userItem, email: email ?? '', uid });
            router.push('../Tasks/All');
          }
        });
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
        {isSignUpSuccess && ( // isSignUpSuccessがtrueなら表示
          <Box>
            <Text fontSize="lg" color="green.500">
              新規登録完了
            </Text>
          </Box>
        )}
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Perform Sign Up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          w={'450px'}
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
              {/* ここに追加する */}
              {errorMessage && (
                <Box mt={2} color="red.500">
                  <Text fontSize="sm">{errorMessage}</Text>
                </Box>
              )}
              <Stack spacing={10} pt={2}>

                <Button
                  type="submit"
                  loadingText="Submitting"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>

              </Stack>
              <Center>
                <Button
                  w={'full'}
                  maxW={'md'}
                  variant={'outline'}
                  leftIcon={<FcGoogle />}
                  onClick={handleSignInWithGoogle}>
                  <Center>
                    <Text>Sign Up with Google</Text>
                  </Center>
                </Button>
              </Center>
              <Stack>
                <Text align={'center'}>
                  <Button
                    onClick={() => {
                      router.push('/signin');
                    }}
                    variant="unstyled"
                    color={'blue.400'}
                  >
                    既にアカウントをお持ちの方
                  </Button>
                </Text>
              </Stack>
              <Stack>
                <Text align={'center'}>
                  <Button variant="unstyled" color={'blue.400'} onClick={handleTestAccountSignIn}>
                    テストアカウントでログイン
                  </Button>

                </Text>
              </Stack>
            </Stack>
          </form>

        </Box>
      </Stack>
    </Flex >
  );
}

export default SignUp;