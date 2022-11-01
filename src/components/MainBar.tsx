import { useColorModeValue, Button, Box } from "@chakra-ui/react"
import { MainItems } from "@constants"
import { NavItem } from "./NavItem"

export const MainBar = ({ filter, setFilter }: any) => {
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
        MainItems.map((link: any) => (
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
