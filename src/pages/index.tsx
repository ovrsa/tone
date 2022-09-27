import type { NextPage } from 'next'
import Link from 'next/link'
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  SearchIcon,
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons'
import {
  Menu,
  Box,
  Heading,
  useColorModeValue,
  Flex,
  HStack,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  VStack
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

// firebaseのコレクションから複数のドキュメントを取得する

const q = query(
  collection(db, 'posts'),
  where('isDraft', '==', false),
  where('isTrash', '==', false),
  // ---------------------------------------------------------
  orderBy('create')
)

const Home: NextPage = () => {
  // recoilでatomから引っ張ってきたグローバルの値
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
    console.log(targetPost)
    setPosts(posts.filter((post: any) => post !== targetPost))
    // postsにfilterをかけてクリックされたpostを抽出
    await deleteDoc(doc(db, "posts", targetPost.id));
  }

  return (
    <>
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
      <Box display={{ md: "flex" }}></Box>
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