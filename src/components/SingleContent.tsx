import {
  DeleteIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
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

export const SingleContent = ({ setTodo, filterOption }: props) => {
  const [posts, setPosts] = useState<any>("");
  const [userItem] = useRecoilState(userItemState);
  const router = useRouter()
  const handleAddFormChanges = () => {
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
          detail: post.data().detail,
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
   * @param postData
   */
  const postAddTask = async (postData: ITodoData) => {
    const post = setDoc(doc(db, "users", userItem.uid, "posts", postData.id), postData);
    post.then(() => {
    })
  };

  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo"
  };
  const formattedDate = date.toLocaleString("ja-JP", options);

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
      details: '',
      start: formattedDate,
      priority: '',
      share: true,
    }
    postAddTask(postData);
  }
  return (
    <>
      <Box
        flex={"1"}
        h="100vh"
        pl={2}
        className='Mainbar'>
        <form onSubmit={onAddFormSubmit}>
          <Input
            name="title"
            placeholder='+ Enterキーを押して保存します。'
            onChange={handleAddFormChanges}
          />
        </form>
        {filterOption === "All" ? (
          <Stack >
            {posts && posts.map((post) => (
              <Box key={post.title}>
                <HStack>
                  <Button
                    colorScheme={colors[post.priority]}
                    onClick={() => {
                      setTodo(post)
                      console.log('single')
                      router.push({
                        pathname: `/Tasks/All/${post.id}`,
                        query: post
                      })
                    }}>
                    <a>{post.title}</a>
                  </Button>
                  <Box>
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
              </Box>
            ))}
          </Stack>
        ) : (
          <Stack>
            {posts && posts.map((post) => (
              <Box key={post.title}>
                <HStack>
                  <Button
                    colorScheme={colors[post.priority]}
                    onClick={() => {
                      setTodo(post)
                      router.push({
                        pathname: `/Tasks/All/${post.id}`,
                        query: post
                      })
                    }}>
                    <a>{post.title}</a>
                  </Button>
                  <Spacer />
                  <Box>
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
              </Box>
            ))}
          </Stack>
        )}
      </Box >
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 2 }}
        h="100vh"
      ></Box>
    </>
  );
} 