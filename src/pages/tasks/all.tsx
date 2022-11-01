import React, { ReactNode, useState } from 'react';
import Link from 'next/link'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Avatar,
  VStack,
  Button,
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import {
  AddIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  TimeIcon
} from '@chakra-ui/icons';
import { AllContent } from '@components/AllContent';
import { SearchButton } from "@components/SearchButton"

// LinkItemの型
interface LinkItemProps {
  name: string;
  icon: IconType;
}
// LinkItemの見た目データ
// Array: 配列操作を行うための
// LinkItemProps: LinkItemsのTS型
const LinkItems: Array<LinkItemProps> = [
  { name: 'Tasks', icon: AddIcon },
  { name: 'Memo', icon: EditIcon },
  { name: 'Search', icon: SearchIcon },
];

// Sidebar関数
// children:全ての子要素を取得するプロパティ
export default function SimpleSidebar() {
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

// SidebarPropsの型
// extends: extendsキーワードを用いることでジェネリクスの型を特定の型に限定することができる
interface SidebarProps extends BoxProps {
  // void:（引数とか戻り値とかが）ないことを表す目印として使われる用語
  // 引数や戻り値とかがないときに「ない」の目印として使われる
  onClose: () => void;
}

// ...rest:
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (

    <Box
      flexBasis={"16%"}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }
      }
      // pos:positionの事 fixed:画面の決まった位置に固定する
      pos="fixed"
      h="full"
      {...rest}>
      {/* justifyContent: フレックスコンテナの主軸およびグリッドコンテナーのインライン軸に沿って、中身のアイテムの間や周囲に間隔を配置する*/}
      < Flex h="20" alignItems="center" mx="8" justifyContent="space-between" >
        {/* VStack:縦方向に要素を並べる */}
        <VStack>
          {/* Avatar:アイコン */}
          <Avatar
            mt={5}
            size={'sm'}
            src={
              'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          />
          {/* タイトルテキスト */}
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" >
            Tone
          </Text>
        </VStack >
        {/* menuを閉じる際の×アイコン */}
        < CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex >
      {
        LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} mt={1} >
            <Link href={`../${link.name}/All`}>
              {link.name}
            </Link>
          </NavItem>
        ))
      }
    </Box >
  );
};

// LinkItemの見た目データ
const MainItems = [
  { name: 'All', icon: CheckIcon },
  { name: 'Today', icon: TimeIcon },
  { name: 'Tomorrow', icon: ArrowRightIcon },
  { name: 'Completed', icon: CheckCircleIcon },
  { name: 'Trash', icon: DeleteIcon },
];


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------mainbar-----------------------------------
// -----------------------------------------------------------------------
const MainBar = ({ filter, setFilter }) => {
  console.log(filter)
  return (
    <Box
      flex={"1"}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }
      }
      // pos:positionの事 fixed:画面の決まった位置に固定する
      // pos="fixed"
      h="100vh"
    >
      {/* justifyContent: フレックスコンテナの主軸およびグリッドコンテナーのインライン軸に沿って、中身のアイテムの間や周囲に間隔を配置する*/}

      {
        MainItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} mt={1} >
            <Button
              onClick={() => setFilter(link.name)}>
              {link.name}
            </Button>
          </NavItem>
        ))
      }
    </Box >
  )
}

// NavItemPropsの型
interface NavItemProps extends FlexProps {
  icon: IconType;
}

// NavItemの呼び出し関数
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#"
      style={{ textDecoration: 'none' }
      }>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link >
  );
};

// Mobile
// MobilePropsの型
interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize="2xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Tone
      </Text>
    </Flex>
  );
};