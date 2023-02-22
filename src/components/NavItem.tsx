import { FlexProps, Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

// NavItemProps: NavItemコンポーネントのプロパティを型定義するための型
// iconはReact Iconsのアイコンタイプ、nameはアイテムの名前を表します
interface NavItemProps extends FlexProps {
  icon: IconType;
  name?: string
}

// NavItem: 1、2層目のアイコン、文字見た目のデータを定義するコンポーネント。アイコン、文字列、および他の子要素を受け取る
// restは、他のプロパティを含めたオブジェクト、アイテムの名前とonClick関数などが含まれる
export const NavItem = ({ icon, name, children, ...rest }: NavItemProps) => {
  return (
    <>
      <Flex
        align="center"
        p="3"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={rest.filter === name ? 'gray.600' : ""}
        _hover={{
          bg: 'gray.600',
          color: 'white'
        }}
        {...rest}
      >
        {/* Icon: iconプロパティを使用して、React Iconsのアイコンを表示
        _groupHoverプロパティは、ユーザーがアイテム上にカーソルを合わせた場合の動作を定義
        また、_hoverプロパティを使用して、ユーザーがアイテムにカーソルを合わせた場合の色を定義 */}
        {icon && (
          <Icon
            border="none"
            mr="4"
            fontSize="13"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </>
  );
};
