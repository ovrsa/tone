import { FlexProps, Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";

// NavItemPropsの型
interface NavItemProps extends FlexProps {
  icon: IconType;
}

// NavItemの呼び出し関数
export const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
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
