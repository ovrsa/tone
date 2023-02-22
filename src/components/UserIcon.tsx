import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userItemState } from '../atoms/atom';

const UserIcon = () => {
  const userItem = useRecoilValue(userItemState);

  const emailInitial = userItem.email ? userItem.email[0].toUpperCase() : '';
  const iconSize = '40px';
  const iconBgColor = 'blue.500';
  const iconTextColor = 'white';

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
