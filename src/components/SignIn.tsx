import { userItemState } from '@atoms/atom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Center,
  Text
} from '@chakra-ui/react';
import { auth, provider } from '@hooks/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRecoilState } from 'recoil';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userItem, setUserItem] = useRecoilState(userItemState);
  const router = useRouter();

  //SignIn処理
  const handleSignIn = (event: any) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //ユーザー情報取得処理しuserItemへ格納
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { email, uid } = user as User;
            setUserItem({ ...userItem, email, uid });
          }
        });
        router.push("../Tasks/All");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value);
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>

          <form onSubmit={handleSignIn}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'center'}
                  justify={'space-between'}>
                </Stack>
                <Link color={'blue.400'}>パスワードをお忘れの場合</Link>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
              <Center>
                <Button
                  w={'full'}
                  maxW={'md'}
                  variant={'outline'}
                  leftIcon={<FcGoogle />}
                  onClick={signInWithGoogle}>
                  <Center>
                    <Text>Sign In with Google</Text>
                  </Center>
                </Button>
              </Center>
            </Stack>
          </form>

        </Box>
      </Stack>
    </Flex>
  );
}