import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import { SingleContent } from '@components/SingleContent'
import { Detail } from '@components/Detail'
import { useState } from 'react'
import { MainBar } from '@components/MainBar'
import { MobileNav } from '@components/MobileNav'
import { SidebarContent } from '@components/SidebarContent'

// Sidebar関数
// children:全ての子要素を取得するプロパティ
export default function SinglePage() {
  // isOpen: 折りたたみを発火させる際のトリガー
  // useDisclosure: chakra-uiのカスタムフック、開く、閉じるの支援
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentTodo, setCurrentTodo] = useState<any>('')
  return (
    // minH:要素の最小高
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
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
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      {/* display={{}}: レスポンシブ構文 */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Flex ml={{ base: 0, md: 60 }} p="0" h="100vh">
        <MainBar flex-basis={'20%'} />
        <SingleContent flex-basis={'100%'} setTodo={setCurrentTodo} />
        <Detail
          flex-basis={'100%'}
          todo={currentTodo}
          setTodo={setCurrentTodo}
        />
      </Flex>
    </Box>
  )
}

