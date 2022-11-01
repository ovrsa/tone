import { Avatar, Box, BoxProps, Text, CloseButton, Flex, Link, useColorModeValue, VStack } from '@chakra-ui/react';
import { LinkItems } from '@constants';
import React from 'react'
import { NavItem } from './NavItem';

// SidebarPropsの型
// extends: extendsキーワードを用いることでジェネリクスの型を特定の型に限定することができる
interface SidebarProps extends BoxProps {
  // void:（引数とか戻り値とかが）ないことを表す目印として使われる用語
  // 引数や戻り値とかがないときに「ない」の目印として使われる
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
