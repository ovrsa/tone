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
import { useRecoilState } from 'recoil'
import React from "react";
import db from "../lib/firebase";
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import usePasswordValidation from '../hooks/usePasswordValidation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_isLogin, _setIsLogin] = useRecoilState(isLoginState)
  const [_uid, _setUid] = useRecoilState(userItemState)
  const [userItem, setUserItem] = useRecoilState(userItemState);

  const [isSignUpSuccess, _setIsSignUpSuccess] = useState(false);
  const router = useRouter()
  const { errorMessage, checkPassword } = usePasswordValidation();

  const handleSubmit = async (event: any) => {
    // checkPassword フックでパスワードの整合性をチェック、問題があればエラーを表示
    try {
      event.preventDefault();
      checkPassword(password);
    } catch (error) {
      console.log(error);

      return;
    }

    try {
      // Firebase Authentication で新しいユーザーアカウントを作成

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      // createUserWithEmailAndPassword が成功した場合は、Firebaseの setDoc 関数を使用して、Firestore にユーザー情報を保存

      await setDoc(userDocRef, {
        uid: user.uid,
        timeStamp: serverTimestamp(),
        email: user.email
      });
      // Recoilのステート管理機能を使用して、アプリ全体でログイン状態を管理するために isLogin ステートと uid ステートを更新
      // 最後に、router.push 関数を使用して、ユーザーをタスク一覧ページにリダイレクト
      setUserItem({ uid: user.uid, email: user.email || "" });
      router.push('../Tasks/All');
    } catch (error) {
      console.log(error);
    }
  };

  // input要素の入力値が変更されたときに、その入力値を取得して、emailステートを更新する
  // 引数にイベントオブジェクトを取り、event.currentTarget.valueを使用して、input要素の現在の値を取得
  // そして、その値をsetEmail関数を使用してemailステートに更新している
  // handleChangeEmail関数は、input要素のonChangeプロパティに指定されているため、ユーザーがinput要素の値を変更するたびに、この関数が呼び出される
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  // 同上
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const [_user] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const _user = result.user;
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
        const _user = userCredential.user;
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