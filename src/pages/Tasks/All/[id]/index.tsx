import {
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { AllContent } from '@components/AllContent'
import { Detail } from '@components/Detail'
import { useState } from 'react'
import { MainBar } from '@components/MainBar'
import { SidebarContent } from '@components/SidebarContent'
import UserIcon from '@components/UserIcon'
import Logout from '@components/Logout'

// SinglePage:タスク選択時の画面
const SinglePage = () => {
  const [currentTodo, setCurrentTodo] = useState<any>('')
  const [filter, setFilter] = useState("All")
  const [filterOption, setFilterOption] = useState("All");

  return (
    <Flex
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      <Box
        flexBasis={{ base: "100%", md: "12%" }}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        bg={useColorModeValue("white", "blackAlpha.700")}
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        h={{ base: "auto", md: "100vh" }}
      >
        <SidebarContent
          filter={filter}
        />
        <Flex
          ml={5}
          mb={5}
        >
          <UserIcon />
          <Logout />
        </Flex>
      </Box>

      <Box
        flexBasis={{ base: "100%", md: "20%" }}
        borderRight="1px"
        w={{ base: "full", md: "20%" }}
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        bg={useColorModeValue("white", "blackAlpha.600")}
      >
        <MainBar
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          filter={filter}
          setFilter={setFilter}
        />
      </Box>

      <Box
        flexBasis={{ base: "100%", md: "35%" }}
        height={{ base: "auto", md: "100vh" }}
        w={{ base: "full", md: "35%" }}
        pl={2}
        pr={2}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          width: "5px",
          scrollbarColor: "#000000 #ffffff",
        }}
        bg={useColorModeValue("white", "blackAlpha.500")}
      >
        <AllContent
          filterOption={filterOption}
          filter={filter}
          setTodo={setCurrentTodo}
        />
      </Box>

      <Box
        flexBasis={{ base: "100%", md: "35%" }}
        w={{ base: "full", md: "35%" }}
        p={2}
        bg={useColorModeValue("white", "blackAlpha.500")}
        justifyContent="center"
        alignItems="center"
        h="100vh"
      >
        <Detail todo={currentTodo} setTodo={setCurrentTodo} />
      </Box>


    </Flex>)
}

export default SinglePage

