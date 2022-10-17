import {
  DeleteIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,

  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  collection,
  getDocs,
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
import { useEffect } from 'react';

// firebaseのコレクションから複数のドキュメントを取得する
const q = query(
  collection(db, 'posts'),
  where('isDraft', '==', false),
  where('isTrash', '==', false),
  orderBy('create')
)

export const Content = () => {
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
      // detail: e.target.elements["detail"].value
    }
    postAddTask(postData);
  }
  return (
    <>
      <Box
        flex={"1"}
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
          {posts.map((post: any) => (
            <>
              <HStack>
                <Box key={post.title}>
                  <Link href={`./All/${post.id}`}>
                    <a>{post.title}</a>
                  </Link>
                </Box>

                {/* 削除アイコン */}
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
              </HStack>
            </>
          ))}
        </Stack>
      </Box >
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 12 }
        }
        // pos:positionの事 fixed:画面の決まった位置に固定する
        // pos="fixed"
        h="95vh"
      ></Box>

      {/* detailBar */}
      {/* <Textarea name="detail" placeholder='テキスト' /> */}
    </>
  );
} 