import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { auth } from '../hooks/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);

  const [showPassword, setShowPassword] = useState(false);
  // パスワードshow
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // const { emailInput, passwordInput } = event.target.elements;
    // ↓v9の場合の書き方
    createUserWithEmailAndPassword(auth, email, password)
    // ↓.thenはawaitと同じ
    .then(( userCredential) => {
      console.log('user created');
      console.log(userCredential);

    })
    // errorが出た場合はcatchの処理を走らせる
    .catch((error) => {
      alert(error.message)
      console.error(error)
    }); 
  };
  // Eメールを送信した際、setEmailの値が変更される
  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value);
  };
  // パスワードを送信した際、setPasswordの値が変更される
  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  return (
      <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
        >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
      <Avatar bg="teal" />
      <Heading color="teal">Sign Up</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        {/* stack 外枠 */}
      <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.100"
        boxShadow="md"
      >

        {/* 登録フォーム */}
      <form onSubmit={handleSubmit}>

      {/* メールアドレス */}
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
          />
          <Input 
          type="email" 
          name="email" 
          placeholder="email address" 
          onChange={(event) => handleChangeEmail(event)}
          autoFocus={true}
          />
        </InputGroup>
      </FormControl>
      
      {/* パスワード */}
      <FormControl>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="black"
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password" 
            onChange={(event) => handleChangePassword(event)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText textAlign="right">
        </FormHelperText>
      </FormControl>

      <Button
        borderRadius={0}
        type="submit"
        variant="solid"
        colorScheme="teal"
        width="full"
      >
        Sign Up
      </Button>
    </form>

        </Stack>
        </Box>
        </Stack>
        <Box>
        <Link color="teal.500" href="./signin">
          既にアカウントをお持ちの方
        </Link>
      </Box>
      </Flex>
    );
  };
  export default Signup;



