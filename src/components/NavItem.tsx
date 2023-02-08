import { FlexProps, Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";

// NavItemPropsの型
interface NavItemProps extends FlexProps {
  icon: IconType;
  name?: string
}

//NavItem: 1、2層目のアイコン、文字見た目のデータ
export const NavItem = ({ icon, name, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#"
      style={{ textDecoration: 'none' }
      }>
      <Flex
        align="center"
        p="2"
        mx="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={rest.filter === name ?
          'gray.600'
          : ""}
        _hover=
        {{
          bg: 'gray.600',
          color: 'white'
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="5"
            fontSize="15"
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
