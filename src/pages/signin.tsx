import React from 'react';
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
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import {auth} from '../hooks/firebase';
// ↓firebase v9の際のログイン機能には必須
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link';

const Signin = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    const { email, password } = event.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((user) => {
        console.log('ログイン成功=', user.user.uid)
      })
      .catch((error) => {
        console.error(error)
        alert(error.message)
      })
  }

  // パスワードshow
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

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
        <Heading color="teal">Sign In</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.100"
              boxShadow="md"
            >
            <form onSubmit={handleSubmit}>
              {/* email */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  />
                  <Input 
                  type="email" 
                  name="email"
                  placeholder="email address" 
                  />
                </InputGroup>
              </FormControl>

              {/* pasword */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="black"
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
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

              {/* submit button */}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </form>
            </Stack>
        </Box>
      </Stack>

      {/* signupへ遷移 */}
      <Box>
        <Link color="teal.500" href="./signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Signin;
