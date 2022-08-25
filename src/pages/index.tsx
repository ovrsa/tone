import type { NextPage } from 'next'
import Link from 'next/link'
import { AddIcon, DeleteIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, SearchIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {Menu, Container, Box, Heading, useColorModeValue, Flex, HStack, MenuButton, IconButton, MenuList, MenuItem, Button} from "@chakra-ui/react"

const Home: NextPage = () => {
  return (
    <Container>
      {/* ヘッダー */}
      <Menu>
        <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
        />
        <MenuList>
          <MenuItem icon={<AddIcon />} command='⌘T'>
          Home
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
          Setting
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
          View Source
          </MenuItem>
          <Link href="./signup">
          <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
          Logout
          </MenuItem>
          </Link>
        </MenuList>
      </Menu>

      <Flex 
      borderRadius="lg" 
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} 
      p={3}
      mt={6}
      mb={6}
      justify="center"
      ></Flex>
      <Box display={{md:"flex"}}></Box>
      <Box flexGrow={1}>
        <Heading as="h2" variant="page-title">
          Reminder App
        </Heading>
        <Box>A reminder app that works with Google Calendar</Box>
      </Box>

{/* コントロールパネル */}
    <HStack spacing='24px'>
      <Flex
        p={3} 
        mt={6}
        mb={6} 
        justify="center"
        >
        {/* <NextLink href="/setting" passHref> */}
        
        <Link href="./create">
        <IconButton
        variant='outline'
        colorScheme='pink'
        aria-label='Send email'
        border="0"
        icon={<AddIcon />}
        />
        </Link>

        {/* <NextLink/> */}  
        <IconButton
        variant='outline'
        colorScheme='pink'
        aria-label='Send email'
        border="0"
        icon={<ViewIcon />}
        />

        <IconButton
        variant='outline'
        colorScheme='pink'
        aria-label='Send email'
        border="0"
        icon={<ViewOffIcon />}
        />

        <IconButton
        variant='outline'
        colorScheme='pink'
        aria-label='Send email'
        border="0"
        icon={<SearchIcon />}
        />
      </Flex>
    </HStack>

{/* ポスト */}
    <HStack>
      <Box>タイトル</Box>
      <Box>10:00 ~ 12:00</Box>
      <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Send email'
        border="0"
        icon={<ExternalLinkIcon />}
        />
        
        <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Send email'
        border="0"
        icon={<EditIcon />}
        />

        <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Send email'
        border="0"
        icon={<DeleteIcon />}
        />
      
    </HStack>
{/* footer */}
    <Flex align="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Yamasaki Kyo
    </Flex>
    </Container>
  
  )
}

export default Home
