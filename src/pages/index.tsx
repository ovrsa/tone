import type { NextPage } from 'next'
import Link from 'next/link'
import {
  AddIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  MinusIcon,
  SearchIcon,
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons'
import {
  Menu,
  Box,
  Flex,
  HStack,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  VStack,
  Input,
  Checkbox,
  Divider,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"
import db from "../hooks/firebase"
import { useEffect } from 'react'
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  deleteDoc
} from "firebase/firestore"
import { useRecoilState } from "recoil";
import { postsState } from "@atoms/atom"
import { ITodoData } from "@interfaces/todo"
import { ControlbarData } from '@components/ControlbarData'
import { SidebarData } from '@components/SidebarData'

// firebaseのコレクションから複数のドキュメントを取得する
const q = query(
  collection(db, 'posts'),
  where('isDraft', '==', false),
  where('isTrash', '==', false),
  orderBy('create')
)

const Home: NextPage = () => {
  // recoilでatomから取得したグローバルの値
  const [posts, setPosts] = useRecoilState(postsState);

  // recoilで取得した値をonSnapshotで取得、mapで処理を回して全て表示
  // ※onSnapshotを実行すると最初に全てのドキュメントを取得するのでuseEffectで制御
  useEffect(() => {
    const unSub = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((post) => ({
          id: post.data().id,
          title: post.data().title,
          text: post.data().text
        }))
      )
    })
    return () => unSub()
  }, [])

  useEffect(() => {
    // データベースからデータを取得する
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
      // ...: スプレッド記法、式を複数の要素に展開して、それぞれ関数呼び出す
    });

    // リアルタイムで取得
    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    })
  }, []);

  //削除関数
  const handleDeletePost = async (targetPost: ITodoData) => {
    setPosts(posts.filter((post: any) => post !== targetPost))
    // postsにfilterをかけてクリックされたpostを抽出
    await deleteDoc(doc(db, "posts", targetPost.id));
  }

  return (
    <>
      {/* コントロールバー */}
      <div className='Controlbar'>
        <ul className='ControlbarList'>
          {/* keyは配列の割り振られた点字の番号 */}
          {ControlbarData.map((value, key) => {
            return (
              <li
                key={key}
                // pathnameの値がvalueのlinkと等しければactiveを付与、異なれば""に
                // id={window.location.pathname == value.link ? "active" : ""}
                className="row"
                onClick={() => {
                  // ControlbarDataのvalueのlinkをwindowのパスネームに割り当てる
                  window.location.pathname = value.link;
                }}>
                {/* ControlbarDataのvalueの中のicon */}
                <div id="icon">{value.icon}</div>
              </li>
            )
          })}
        </ul>
      </div>
      <Button>Open Modal</Button>
      <Modal>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input name="title" placeholder='検索して特定のタスクを見つける' autoFocus />

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* TOP */}
      <div className='Sidebar'>
        <ul className='SidebarList'>
          {/* keyは配列の割り振られた点字の番号 */}
          {SidebarData.map((value, key) => {
            return (
              <li
                key={key}
                // pathnameの値がvalueのlinkと等しければactiveを付与、異なれば""に
                // id={window.location.pathname == value.link ? "active" : ""}
                className="row"
                onClick={() => {
                  // SidebarDataのvalueのlinkをwindowのパスネームに割り当てる
                  window.location.pathname = value.link;
                }}>
                {/* SidebarDataのvalueの中のicon */}
                <div id="icon">{value.icon}</div>
                <div id="title">{value.title}</div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Titlebar */}
      <div className='Mainbar'>
        <form>
          <label htmlFor="todo"></label>
          <Box
            color="#ffffff"
            fontWeight='semibold'
            fontSize='large'
          >今日(TOPの内容によって変更)</Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              color="#ffffff"
            />
            <MenuList>
              <MenuItem icon={<CheckCircleIcon />}>
                完了済を隠す
              </MenuItem>
              <MenuItem icon={<MinusIcon />}>
                詳細を隠す
              </MenuItem>
            </MenuList>
          </Menu>
          <Input name="title" placeholder='+ 本日のタスクを追加します。Enterキーを押して保存します。' autoFocus />
        </form>
        {/* ポスト */}
        <Stack direction='row' h='100px' p={4}>
          <Divider orientation='vertical' />
          <Box>title</Box>
          <Box
            color='gray.500'
            fontWeight='semibold'
            fontSize='xs'
          >
            sample
          </Box>
        </Stack>
      </div >

      {/* Detailbar */}
      {/* 予定共有 */}
      <Checkbox
        size='sm'
        color='gray.500'
        fontWeight='semibold'
        fontSize='xs'
      >
        予定を共有しない
      </Checkbox>

      {/* 重要度 */}
      <Menu>
        <MenuButton
          px={2}
          py={1}
          transition='all 0.2s'
          borderRadius='md'
          borderWidth='1px'
          _hover={{ bg: 'gray.400' }}
          _expanded={{ bg: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
        >
          優先度
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>高</MenuItem>
          <MenuItem>中</MenuItem>
          <MenuItem>低</MenuItem>
          <MenuItem>無</MenuItem>
        </MenuList>
      </Menu>
      <Divider />
      <Box
        fontWeight='semibold'
      >title</Box>
      <Box>detail(常に修正可)</Box>

      {/* ---------------------------------------------------------------- */}
      {/* コントロールパネル */}
      <HStack spacing='24px'>
        <Flex
          p={3}
          mt={6}
          mb={6}
          justify="center"
        >

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
      <VStack>
        {posts.map((post: any) => (
          <>
            <HStack>
              <Box key={post.title}>
                <Link href={`/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </Box>

              <Box>10:00 ~ 12:00</Box>
              <Link href={`/${post.id}`}>
                <IconButton
                  variant='outline'
                  colorScheme='teal'
                  aria-label='ExternalLinkIcon'
                  border="0"
                  icon={<ExternalLinkIcon />}
                />
              </Link>

              {/* 編集アイコン */}
              <Link href={`/${post.id}/edit`}>
                <IconButton
                  variant='outline'
                  colorScheme='teal'
                  aria-label='EditIcon'
                  border="0"
                  icon={<EditIcon />}
                />
              </Link>

              {/* 削除アイコン */}
              <IconButton
                variant='outline'
                colorScheme='teal'
                aria-label='DeleteIcon'
                border="0"
                onClick={() => handleDeletePost(post)}
                icon={<DeleteIcon />}
              />
            </HStack>
          </>
        ))}
      </VStack>

      {/* footer */}
      <Flex align="center" opacity={0.4} fontSize="sm">
        &copy; {new Date().getFullYear()} Yamasaki Kyo
      </Flex>
    </>

  )
}

export default Home