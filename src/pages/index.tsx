import { Button, Flex, Heading, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const SplitScreen = () => {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  const handleSignInClick = () => {
    router.push('/signin');
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
          >
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Tone
            </Text>
            <br />{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            この予定管理アプリは、タスクと予定を区別せずに、ひとつの画面で予定の全体を把握し、メモ感覚で登録できます。デイリー、ウィークリーのビューで確認し、半予定化したタスクについても取りこぼしを防止できます。効率的な時間管理をサポートします。
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
            <Button rounded={'full'} onClick={handleSignInClick}>
              Sign In
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'/images/Sample.jpg'}
        />
      </Flex>
    </Stack>
  );
}

export default SplitScreen