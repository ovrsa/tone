import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { LinkItems } from '@constants';
import { NavItem } from './NavItem';
import { useRouter } from 'next/router';

interface SidebarContentProps {
  filter: string;
}

// SidebarContent: 1層目
// rest：1層目以外で受け取った他のプロパティをまとめたオブジェクト
// filter：タスクのフィルター情報を表す変数
export const SidebarContent = ({ filter, ...rest }: SidebarContentProps) => {
  const router = useRouter();

  return (
    <Box
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <VStack>
          <Text fontSize="2xl" fontWeight="bold">Tone</Text>
        </VStack>
      </Flex>
      {/* LinkItems：リンク情報を保持したオブジェクト */}
      {LinkItems.map(link => (
        <NavItem
          filter={filter}
          icon={link.icon}
          mt={1}
          key={link.name}
          onClick={() => {
            router.push({
              pathname: `/Tasks/All`,
            });
          }}
        >
          <Box>{link.name}</Box>
        </NavItem>
      ))}
    </Box>
  );
};
