import {
  DeleteIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  deleteDoc,
  setDoc
} from "firebase/firestore"
import db from "../lib/firebase"
import { v4 as uuidv4 } from 'uuid';
import { ITodoData } from '../interfaces/todo'
import Link from 'next/link';
import { userItemState } from "@atoms/atom"
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const colors = { High: "red", Middle: "yellow", Low: "blue" }


type props = {
  setTodo: any
}

// SingleContent:
export const SingleContent = ({ setTodo, filterOption }: props) => {
  const [posts, setPosts] = useState<any>("");
  const [userItem] = useRecoilState(userItemState);
  const router = useRouter()
  const handleAddFormChanges = () => {
    setPosts("")
  }

  useEffect(() => {
    const q = query(
      collection(db, "users", userItem.uid, 'posts'),
    )
    const unSub = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((post) => ({
          id: post.data().id,
          title: post.data().title,
          text: post.data().text,
          start: post.data()?.start ?? "",
          share: post.data().share,
          priority: post.data().priority,
        }))
      )
    })
    return () => unSub()
  }, [])

  useEffect(() => {
    const postData = collection(db, "users", userItem.uid, "posts");
    getDocs(postData).then((snapShot) => {
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });

    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    })
  }, []);

  //削除関数
  const handleDeletePost = async (targetPost: ITodoData) => {
    setPosts(posts.filter((post: any) => post !== targetPost))
    // postsにfilterをかけてクリックされたpostを抽出
    await deleteDoc(doc(db, "users", userItem.uid, "posts", targetPost.id));
  }

  /**
   * タスクを追加する
   * @param postData 送信するデータ
   */
  const postAddTask = async (postData: ITodoData) => {
    /**
     * Firebaseに送信する
     */
    const post = setDoc(doc(db, "users", userItem.uid, "posts", postData.id), postData);
    post.then(() => {
      // inputを空に
    })
  };

  /**
   * 変更イベントで呼び出される関数
   * @param e HTMLイベント
   */
  const onAddFormSubmit = (e: any) => {
    // 本来のSubmitの機能を停止
    e.preventDefault();

    // const postData: ITodoData = {
    const postData: any = {
      id: uuidv4(),
      title: e.target.elements["title"].value,
    }
    postAddTask(postData);
  }
  return (
    <>
      <Box
        flex={"1"}
        h="100vh"
        pl={12} className='Mainbar'>
        <form onSubmit={onAddFormSubmit}>
          <Flex
            color="#ffffff"
            fontWeight='semibold'
            fontSize='large'
          >全て
          </Flex>

          <label htmlFor="todo"></label>
          <Input
            name="title"
            placeholder='+ Enterキーを押して保存します。'
            onChange={handleAddFormChanges}
            autoFocus
          />
        </form>

        {/* ポスト */}
        <Stack direction='row' p={2}>
        </Stack>

        {filterOption === "All" ? (
          <Stack>
            {posts && posts.map((post: any) => (
              <Flex
                key={post.title}
              // borderRadius="lg"
              // bg={'cyan.400'}
              >
                <HStack>
                  <Box key={post.title}>
                    <Button colorScheme={colors[post.priority]} onClick={() => {
                      setTodo(post)
                      router.push(`/Tasks/All/${post.id}`)
                    }}>
                      <a>{post.title}</a>
                    </Button>
                  </Box>

                  <Box color={"blue.400"}>
                    {post.start ? new Date(post.start).toLocaleDateString() : ""}
                  </Box>

                  <Spacer />

                  <Link href='../All' passHref>
                    <Box>
                      <IconButton
                        variant='outline'
                        colorScheme='teal'
                        aria-label='DeleteIcon'
                        border="0"
                        onClick={() => handleDeletePost(post)}
                        icon={<DeleteIcon />}
                      />
                    </Box>
                  </Link>
                </HStack >
              </Flex>
            ))}
          </Stack >) : (<Stack>
            {posts && posts.map((post: any) => (
              <Flex
                key={post.title}
              // borderRadius="lg"
              // bg={'cyan.400'}
              >
                <HStack>
                  <Box key={post.title}>
                    <Button colorScheme={colors[post.priority]} onClick={() => {
                      setTodo(post)
                      router.push(`/Tasks/All/${post.id}`)
                    }}>
                      <a>{post.title}</a>
                    </Button>
                  </Box>

                  <Box color={"blue.400"}>
                    {post.start ? new Date(post.start).toLocaleDateString() : ""}
                  </Box>

                  <Spacer />

                  <Link href='../All' passHref>
                    <Box>
                      <IconButton
                        variant='outline'
                        colorScheme='teal'
                        aria-label='DeleteIcon'
                        border="0"
                        onClick={() => handleDeletePost(post)}
                        icon={<DeleteIcon />}
                      />
                    </Box>
                  </Link>
                </HStack >
              </Flex>
            ))}
          </Stack >)
        }
      </Box >
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 12 }
        }
        h="100vh"
      ></Box>
    </>
  );
} 