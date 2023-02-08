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
  doc,
  onSnapshot,
  deleteDoc,
  setDoc,
  collection,
  query,
} from "firebase/firestore"
import db from "../lib/firebase"
import { v4 as uuidv4 } from 'uuid';
import { ITodoData } from '../interfaces/todo'
import Link from 'next/link';
import { postsState, userItemState, filteredPostsLengthState } from "@atoms/atom"
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatDate, formatDateforFirebase } from '@utils/formatData';

export const AllContent = ({ filter, filterOption }: any) => {
  const [posts, setPosts] = useRecoilState(postsState);
  const [userItem] = useRecoilState(userItemState);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [priorityFilteredPost, setPriorityFilteredPost] = useState([]);
  const router = useRouter()
  const colors = { High: "red", Middle: "yellow", Low: "blue" }
  const setFilteredPostsLength = useSetRecoilState(filteredPostsLengthState)

  // 日時によってのタスクの数を算出
  const allLength = posts.length
  const todayLength = posts.filter((post: any) => formatDate("Today") === formatDateforFirebase(post.start)).length
  const tomorrowLength = posts.filter((post: any) => formatDate("Tomorrow") === formatDateforFirebase(post.start)).length
  const next7DaysLength = posts.filter((post: any) => formatDate("Next7Days") >= formatDateforFirebase(post.start)).length
  const completedLength = posts.filter((post: any) => formatDate("Completed") >= formatDateforFirebase(post.start)).length

  // 関数を一通りdaysFilterTaskListオブジェクトに纏める
  const daysFilterTaskList = {
    All: allLength,
    Today: todayLength,
    Tomorrow: tomorrowLength,
    Next7Days: next7DaysLength,
    Completed: completedLength,
  }
  setFilteredPostsLength(daysFilterTaskList)

  // firebaseからの値をonSnapshotで取得、mapで処理を回して全て表示
  // ※onSnapshotを実行すると最初に全てのドキュメントを取得するのでuseEffectで制御
  useEffect(() => {
    // firebaseのコレクションから複数のドキュメントを取得する
    const q = query(
      collection(db, "users", userItem.uid, 'posts'),
    )
    const unSub = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((post) => ({
          id: post.data().id,
          title: post.data().title,
          detail: post.data().detail,
          start: new Date(post.data().start).toLocaleDateString(),
          share: post.data().share,
          priority: post.data().priority
        }))
      )
    })
    return () => unSub()
  }, [])

  // All,Todayなどでのタスクの配列操作
  useEffect(() => {
    switch (filter) {
      case "Today":
        setFilteredPosts(posts.filter((post: any) => formatDate(filter) === formatDateforFirebase(post.start)));
        break;
      case "Tomorrow":
        setFilteredPosts(posts.filter((post: any) => formatDate(filter) === formatDateforFirebase(post.start)));
        break;
      case "Next7Days":
        setFilteredPosts(posts.filter((post: any) => formatDate(filter) >= formatDateforFirebase(post.start)));
        break;
      case "Completed":
        setFilteredPosts(posts.filter((post: any) => formatDate(filter) <= formatDateforFirebase(post.start)));
        break;
      case "All":
        setFilteredPosts(posts);
        break;
      default:
        break;
    }
  }, [posts, filter])


  useEffect(() => {
    setPriorityFilteredPost(filteredPosts.filter((post: any) => post.priority === filterOption));
  }, [filteredPosts, filterOption])

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

  // dateをカレンダーで表示できる形にフォーマットする
  const makeStringDate = (): string => {
    const date = new Date();
    const year = date.getFullYear()
    const month = ('00' + (date.getMonth() + 1)).slice(-2)
    const day = ('00' + date.getDate()).slice(-2)
    const hour = ('00' + date.getHours()).slice(-2)
    const minutes = ('00' + date.getMinutes()).slice(-2)

    return `${year}-${month}-${day}T${hour}:${minutes}`
  }
  console.log(makeStringDate())

  /**
   * 変更イベントで呼び出される関数
   * @param e HTMLイベント
   */
  const onAddFormSubmit = (e: any) => {
    e.preventDefault();

    // const postData: ITodoData = {
    const postData: any = {
      id: uuidv4(),
      title: e.target.elements["title"].value,
      details: '',
      start: makeStringDate(),
      priority: '',
      share: true,
    }
    postAddTask(postData);
  }

  return (
    <>
      <Box
        w={{ base: 'full', md: "35%" }}
        h="100vh"
        pl={2}
        className='Mainbar'>
        <form onSubmit={onAddFormSubmit}>

          <label htmlFor="todo"></label>
          <Input
            mt={2}
            mb={2}
            name="title"
            placeholder='+ Enterキーを押して保存します。'
            autoFocus
          />
        </form>

        {/* ポスト */}
        <Stack direction='row' >
        </Stack>

        {filterOption === "All" ? (
          <Stack>
            {filteredPosts && filteredPosts.map((post: any) => (
              <>
                {/* titleの文字はボタンで表示、router.pushで画面遷移 */}
                <HStack>
                  <Box key={post.title}>
                    <Button
                      colorScheme={colors[post.priority]}
                      onClick={() => {
                        console.log('all')
                        router.push({
                          pathname: `/Tasks/All/${post.id}`,
                          query: post
                        })
                      }}>
                      <a>{post.title}</a>
                    </Button>
                  </Box>

                  {/* 時間表示 */}
                  <Box>
                    {post.start}
                  </Box>

                  <Spacer />

                  {/* 削除アイコン */}
                  <Link href='../Tasks/All' passHref>
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
              </>
            ))}
          </Stack >) : (<Stack>
            {filteredPosts && priorityFilteredPost.map((post: any) => (
              <>
                <HStack>
                  <Box key={post.title}>
                    <Button
                      colorScheme={colors[post.priority]}
                      onClick={() => {
                        router.push({
                          pathname: `/Tasks/All/${post.id}`,
                          query: post
                        })
                      }}>
                      <a>{post.title}</a>
                    </Button>
                  </Box>

                  {/* 時間表示 */}
                  <Box>
                    {post.start}
                  </Box>

                  <Spacer />

                  {/* 削除アイコン */}
                  <Link href='../Tasks/All' passHref>
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
              </>
            ))}
          </Stack >)
        }
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