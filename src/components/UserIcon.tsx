import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userItemState } from '../atoms/atom';


const UserIcon = () => {

  const [emailInitial, setEmailInitial] = useState<string>('');
  const userItem = useRecoilValue(userItemState);
  const iconSize = '40px';
  const iconBgColor = 'blue.500';
  const iconTextColor = 'white';

  useEffect(() => {
    if (userItem) {
      const initialEmail = userItem.email[0].toUpperCase();
      setEmailInitial(initialEmail);
    }
  }, [userItem]);

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      borderRadius='50%'
      backgroundColor={iconBgColor}
      color={iconTextColor}
      fontSize='xs'
      fontWeight='bold'
      width={iconSize}
      height={iconSize}
    >
      <Text>{emailInitial}</Text>
    </Flex>
  );
};

export default UserIcon;
