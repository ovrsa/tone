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
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  deleteDoc,
  setDoc
} from "firebase/firestore"
import db from "../hooks/firebase"
import { v4 as uuidv4 } from 'uuid';
import { ITodoData } from '../interfaces/todo'
import Link from 'next/link';
import { postsState } from "@atoms/atom"
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// firebaseのコレクションから複数のドキュメントを取得する
const q = query(
  collection(db, 'posts'),
  where('isDraft', '==', false),
  where('isTrash', '==', false),
  orderBy('create')
)

type props = {
  setTodo: any
}
// 今日の日付を取得
const formatDate = (day) => {
  const today = new Date();
  if (day === "Today") {
    const dayOfWeek = today.getDay();
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + dayOfWeekStr;
    return todayValue
  } else if (day === "Tomorrow") {
    const dayOfWeek = today.getDay() + 1;
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate() + 1) + "/" + dayOfWeekStr;
    return todayValue
  } else {
    const dayOfWeek = today.getDay() + 7;
    const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate() + 7) + "/" + dayOfWeekStr;
    return todayValue
  }
};
// formatDate();

const formatDateforFirebase = (date) => {
  const today = new Date(date);
  const dayOfWeek = today.getDay();
  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  const todayValue = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + dayOfWeekStr;
  return todayValue
  // console.log(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + dayOfWeekStr);
}
formatDateforFirebase("firebaseの値をmapで");

export const AllContent = ({ filter }: any) => {
  // recoilでatomから取得したグローバルの値
  const [posts, setPosts] = useRecoilState(postsState);
  // useStateで絞り込みの値を保存

  // useRouterを使用するために関数定義
  const router = useRouter()

  // recoilで取得した値をonSnapshotで取得、mapで処理を回して全て表示
  // ※onSnapshotを実行すると最初に全てのドキュメントを取得するのでuseEffectで制御
  useEffect(() => {
    const unSub = onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((post) => ({
          id: post.data().id,
          title: post.data().title,
          text: post.data().text,
          start: new Date(post.data().start).toLocaleDateString(),
          share: post.data().share
        }))
      )
    })
    return () => unSub()
  }, [])

  const [filteredPosts, setFilteredPosts] = useState([]);

  // 明日の日付を取得
  const Tomorrow = new Date();
  const tomorrowOfWeek = Tomorrow.getDay() + 1;
  const tomorrowOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][tomorrowOfWeek];
  const TomorrowValue = [Tomorrow.getFullYear() + "/" + (Tomorrow.getMonth() + 1) + "/" + (Tomorrow.getDate() + 1) + "/" + tomorrowOfWeekStr];
  console.log(TomorrowValue)
  // console.log(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + tomorrowOfWeekStr);

  // 次の7日間の日付を取得
  const NextSevenDays = new Date();
  const NextSevenDaysOfWeek = NextSevenDays.getDay();
  const NextSevenDaysOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][NextSevenDaysOfWeek];
  const NextSevenDaysValue = [NextSevenDays.getFullYear() + "/" + (NextSevenDays.getMonth() + 1) + "/" + (NextSevenDays.getDate() + 1) + "/" + NextSevenDaysOfWeekStr];
  console.log(NextSevenDaysValue)
  // console.log(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + "/" + tomorrowOfWeekStr);

  // SPAでMainBarのタブによって配列の操作を表現
  useEffect(() => {
    if (filter === "Today") {
      setFilteredPosts(posts.filter((post: any) => formatDate(filter) === formatDateforFirebase(post.start)));
    } else if (filter === "Tomorrow") {
      setFilteredPosts(posts.filter((post: any) => formatDate(filter) === formatDateforFirebase(post.start)));
    } else if (filter === "Next 7 Days") {
      setFilteredPosts(posts.filter((post: any) => formatDate(filter) >= formatDateforFirebase(post.start)));
    } else if (filter === "All") {
      setFilteredPosts(posts)
    };
  }, [posts, filter])

  //削除関数
  const handleDeletePost = async (targetPost: ITodoData) => {
    setPosts(posts.filter((post: any) => post !== targetPost))
    // postsにfilterをかけてクリックされたpostを抽出
    await deleteDoc(doc(db, "posts", targetPost.id));
  }

  /**
   * タスクを追加する
   * @param postData 送信するデータ
   */
  const postAddTask = async (postData: ITodoData) => {
    /**
     * Firebaseに送信する
     */
    const post = setDoc(doc(db, "posts", postData.id), postData);
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
      share: true
      // detail: e.target.elements["detail"].value,
      // start: e.target.elements["start"].value,
      // end: e.target.elements["end"].value
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
          <Input name="title" placeholder='+ Enterキーを押して保存します。' autoFocus />
        </form>

        {/* ポスト */}
        <Stack direction='row' p={2}>
        </Stack>

        <Stack>
          {filteredPosts.map((post: any) => (
            <>
              {/* titleの文字はボタンで表示、router.pushで画面遷移 */}
              <HStack>
                <Box key={post.title}>
                  <Button onClick={() => {
                    router.push(`/Tasks/All/${post.id}`)
                  }}>
                    <a>{post.title}</a>
                  </Button>
                </Box>

                {/* 時間表示 */}
                <Box color={"blue.400"}>
                  {post.start}
                </Box>

                {/* 削除アイコン */}
                <Link href='./' passHref>
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
        </Stack >

      </Box >
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 12 }
        }
        // pos:positionの事 fixed:画面の決まった位置に固定する
        // pos="fixed"
        h="100vh"
      ></Box>
    </>
  );
} 