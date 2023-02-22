import React, { useState } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { AllContent } from '@components/AllContent';
import { SidebarContent } from '@components/SidebarContent';
import { MainBar } from '@components/MainBar';
import { MobileNav } from '@components/MobileNav';
import Unselected from '@components/Unselected';
import Logout from '@components/Logout';
import UserIcon from '@components/UserIcon';

export default function AllPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_currentTodo, setCurrentTodo] = useState<any>('')
  const [filter, setFilter] = useState("All")
  const [filterOption, setFilterOption] = useState("All");

  return (
    <Flex>
      <Box
        flexBasis="12%"
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: '12%' }}
        bg={useColorModeValue('white', 'blackAlpha.700')}
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        h="100vh"
      >
        <SidebarContent
          filter={filter}
          onClose={onClose}
        />
        <Flex
          ml={5}
          mb={5}
        >
          <UserIcon />
          <Logout />
        </Flex>
      </Box>

      <Box
        flexBasis="18%"
        borderRight="1px"
        w={{ base: 'full', md: '20%' }}
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        bg={useColorModeValue('white', 'blackAlpha.600')}
      >
        <MainBar
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          filter={filter}
          setFilter={setFilter}
        />
      </Box>

      <Box
        flexBasis="40%"
        height="100vh"
        w={{ base: 'full', md: '35%' }}
        pl={2}
        pr={2}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          width: '5px',
          scrollbarColor: '#000000 #ffffff',
        }}
        bg={useColorModeValue('white', 'blackAlpha.500')}
      >
        <AllContent
          filterOption={filterOption}
          filter={filter}
          setTodo={setCurrentTodo}
        />
      </Box>

      <Box
        w={{ base: 'full', md: '35%' }}
        p={2}
        bg={useColorModeValue('white', 'blackAlpha.500')}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Unselected />
      </Box>


      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent filter={filter} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        display={{ base: 'flex', md: 'none' }}
        onOpen={onOpen}
      />
    </Flex>
  );
}

