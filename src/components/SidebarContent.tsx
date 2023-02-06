import { Box, Flex, Link, useColorModeValue, Text, CloseButton, VStack } from '@chakra-ui/react';
import { LinkItems } from '@constants';
import React from 'react';
import { NavItem } from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
// SidebarContent: 1層目
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    flexBasis={"16%"}
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <VStack>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">Tone</Text>
      </VStack>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {LinkItems.map(link => (
      <NavItem filter={rest.filter} key={link.name} icon={link.icon} mt={1}>
        <Link href={`../${link.name}/All`}>{link.name}</Link>
      </NavItem>
    ))}
  </Box>
);