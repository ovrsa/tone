import { filteredPostsLengthState } from "@atoms/atom"
import { useColorModeValue, Button, Box } from "@chakra-ui/react"
import { MainItems } from "@constants"
import { useRecoilValue } from "recoil"
import { NavItem } from "./NavItem"
import { PriorityFilter } from "./PriorityFilter"

// MainBar:2層目を成すコンポーネント
export const MainBar = ({ filter, setFilter, filterOption, setFilterOption }: any) => {
  // daysFilter:recoilで管理、AllContentで配列定義
  const daysFilterTaskList = useRecoilValue(filteredPostsLengthState)
  return (
    <Box
      flex={"1"}
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      h="100vh"
    >
      {/* {filter === "All" && <PriorityFilter filterOption={filterOption} setFilterOption={setFilterOption} />} */}
      <PriorityFilter filterOption={filterOption} setFilterOption={setFilterOption} />
      {
        // MainItems:2層のリストが詰まっている
        MainItems.map((link: any) => (
          // NavItem:1層と2層のコンポーネント
          <NavItem key={link.name} icon={link.icon} filter={filter} name={link.name}>
            <Button
              onClick={() => setFilter(link.name)}>
              {link.name}:{daysFilterTaskList[link.name]}
            </Button>
          </NavItem>
        ))
      }
    </Box >
  )
}
