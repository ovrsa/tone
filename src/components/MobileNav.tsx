import { FlexProps, Flex, useColorModeValue, IconButton, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

// MobilePropsの型
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

// MobileNav:Mobile状態のアイコン、文字の情報
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
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