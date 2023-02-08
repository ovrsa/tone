import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'
import { SingleContent } from '@components/SingleContent'
import { Detail } from '@components/detail'
import { useState } from 'react'
import { MainBar } from '@components/MainBar'
import { MobileNav } from '@components/MobileNav'
import { SidebarContent } from '@components/SidebarContent'

// SinglePage:タスク選択時の画面
export default function SinglePage() {
  // useDisclosure: chakra-uiのカスタムフック、開く、閉じるの支援
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentTodo, setCurrentTodo] = useState<any>('')
  const [filter, setFilter] = useState("All")
  const [filterOption, setFilterOption] = useState("All");

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {/* SidebarContent:1層目 */}
      <SidebarContent
        filter={filter}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      {/* Menuを折りたたむ際の動作 */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent filter={filter} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Flex ml={{ base: 'full', md: '12.5%' }}>
        <MainBar
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          filter={filter}
          setFilter={setFilter}
          flex-basis={'20%'} />
        <SingleContent
          filterOption={filterOption}
          filter={filter}
          flex-basis={'100%'}
          setTodo={setCurrentTodo} />
        <Detail
          flex-basis={'100%'}
          todo={currentTodo}
          setTodo={setCurrentTodo}
        />
      </Flex>
    </Box>
  )
}

