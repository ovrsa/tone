import { Avatar, Box, BoxProps, Text, CloseButton, Flex, Link, useColorModeValue, VStack } from '@chakra-ui/react';
import { LinkItems } from '@constants';
import React from 'react'
import { NavItem } from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

// SidebarContent: 1層目
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      flexBasis={"16%"}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }
      }
      pos="fixed"
      h="full"
      {...rest}>
      < Flex h="20" alignItems="center" mx="8" justifyContent="space-between" >
        <VStack>
          <Avatar
            mt={5}
            size={'sm'}
            src={
              'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          />
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" >
            Tone
          </Text>
        </VStack >
        {/* menuを閉じる際の×アイコン */}
        < CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex >
      {
        // 1層目の要素をmapで表示
        LinkItems.map((link) => (
          <NavItem  filter={rest.filter} key={link.name} icon={link.icon} mt={1} >
            <Link href={`../${link.name}/All`}>
              {link.name}
            </Link>
          </NavItem>
        ))
      }
    </Box >
  );
};
