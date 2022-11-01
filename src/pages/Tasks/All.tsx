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

// Sidebar関数
// children:全ての子要素を取得するプロパティ
export default function AllPage() {
  // isOpen: 折りたたみを発火させる際のトリガー
  // useDisclosure: chakra-uiのカスタムフック、開く、閉じるの支援
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState("All")
  return (
    // minH:要素の最小高
    <Box
      p={"0"}
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      {/* Menuを折りたたむ際の動作 */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        // onOverlayClick:モーダルのようにポップアップさせる
        onOverlayClick={onClose}
        size="xs">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      {/* display={{}}: レスポンシブ構文 */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Flex ml={{ base: 0, md: 60 }} p="0">
        <MainBar filter={filter} setFilter={setFilter} />
        <AllContent filter={filter} />
      </Flex>
    </Box>
  );
}

