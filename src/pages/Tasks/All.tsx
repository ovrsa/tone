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
import { ExternalLinkIcon } from '@chakra-ui/icons';

// children:全ての子要素を取得するプロパティ
// AllPage:タスク未選択時の画面
export default function AllPage() {
  // isOpen: 折りたたみを発火させる際のトリガー
  // useDisclosure: chakra-uiのカスタムフック、開く、閉じるの支援
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState("All")
  const [filterOption, setFilterOption] = useState("All");
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <SidebarContent
        filter={filter}
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
          <SidebarContent filter={filter} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      {/* タスク未選択時の画面描画割 */}
      <Flex ml={{ base: 'full', md: '12.5%' }}>
        <MainBar filterOption={filterOption} setFilterOption={setFilterOption} filter={filter} setFilter={setFilter} flex-basis={'20%'} />
        <AllContent filterOption={filterOption} filter={filter} flex-basis={'100%'} />
        <Box display="flex" justifyContent="center" alignItems="center" flex-basis="100%" flex="1.4">
          <ExternalLinkIcon fontSize={20} pr={1} />
          Click task title to view the detail
        </Box>
      </Flex>
    </Box>
  );
}

