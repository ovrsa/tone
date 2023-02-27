import {
  DeleteIcon, MinusIcon,
} from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack
} from '@chakra-ui/react';
import {
  doc,
  onSnapshot,
  deleteDoc,
  setDoc,
  collection,
  query,
  orderBy,
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

type Props = {
  setTodo: React.Dispatch<React.SetStateAction<ITodoData | undefined>>,
  filter: string,
  filterOption: string
}

export const AllContent: React.VFC<Props> = ({ setTodo, filter, filterOption }) => {
  // useRecoilStateを使用して、postsStateアトムの現在の状態と、それを変更するためのsetPosts関数を取得
  const [posts, setPosts] = useRecoilState<ITodoData[]>(postsState);
  // useRecoilStateを使用して、userItemStateアトムの現在の状態を取得
  const [userItem] = useRecoilState(userItemState);
  // useStateを使用して、filteredPostsおよびpriorityFilteredPost状態を初期化
  const [filteredPosts, setFilteredPosts] = useState<ITodoData[]>([]);
  const [_priorityFilteredPost, setPriorityFilteredPost] = useState<ITodoData[]>([]);
  // useRouterを使用して、routerオブジェクトを取得
  const router = useRouter()
  // useSetRecoilStateを使用して、filteredPostsLengthStateアトムを更新するための関数を取得
  const setFilteredPostsLength = useSetRecoilState(filteredPostsLengthState)
  const colors: Record<string, string> = {
    High: "red.300",
    Middle: "yellow.300",
    Low: "blue.300",
    Undefined: "gray.300"
  };

  // useStateを使用して、formを初期化し、入力されたフォームの値を保持するためのhandleAddFormChanges関数を定義
  const [form, setForm] = useState<string>('');
  const handleAddFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  }

  // makeStringDate関数は、現在の日時を文字列で返す
  const makeStringDate = (): string => {
    const date = new Date();
    const year = date.getFullYear()
    const month = ('00' + (date.getMonth() + 1)).slice(-2)
    const day = ('00' + date.getDate()).slice(-2)
    const hour = ('00' + date.getHours()).slice(-2)
    const minutes = ('00' + date.getMinutes()).slice(-2)

    return `${year}-${month}-${day}T${hour}:${minutes}`
  }

  /**
   * @param e HTMLイベント
   */
  // React.FormEvent<HTMLFormElement> は、フォームが送信されたときに発生するイベントを表している
  // const postData は、新しいタスクに関する情報を保持するオブジェクトで、 uuidv4() を使用してランダムなIDを生成、
  //  e.currentTarget.elements["title"].value.trim() でフォームのタイトルを取得し、残りのプロパティに空の値または現在の日付を設定
  // 最後に、 postAddTask 関数を使用して新しいタスクを追加し、 setForm('') でフォームをリセット
  const onAddFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // querySelector メソッドを使用して、フォーム内の要素を取得し、それを型アサーションで HTMLInputElement 型にキャストすることができる
    const titleInputElement = e.currentTarget.querySelector('input[name="title"]') as HTMLInputElement;
    const postData: ITodoData = {
      id: uuidv4(),
      title: titleInputElement.value.trim(),
      detail: '',
      start: makeStringDate(),
      priority: '',
    };

    if (postData.title === '') {
      return;
    }
    postAddTask(postData);
    setForm('');
  }


  // Recoilで管理された状態(postsState, userItemState)の変更を監視し、Firestoreからデータをフェッチするためのコード
  // 具体的には、ユーザーがログインしたときに、ログインしたユーザーのIDでFirestoreの "users"コレクションから "posts"コレクションにアクセスし、それらの投稿を取得する
  // その後、取得したデータを整形して、setPostsを介して、Recoilの"postsState"の状態を更新する
  // useEffectは、postsState、userItemStateのいずれかが変更されたときに再レンダリングをトリガーする
  // また、onSnapshotを使用しており、リアルタイムで更新されたデータを取得するため、Firestoreでの変更をリアルタイムに反映することができる
  // 最後に、unSub関数を返すことにより、コンポーネントがアンマウントされたときにリスナーが解除されるようになっている
  useEffect(() => {
    const q = query(
      collection(db, "users", userItem.uid, 'posts'),
      orderBy("start")
    );
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
  }, [userItem.uid, setPosts, setFilteredPostsLength])

  // useEffectフックを使って、posts配列の要素をfilterの値に基づいてフィルタリングし、setFilteredPostsで新しい配列をセットしている
  // nowは現在の日時を表し、todayは今日の日付、yesterdayは昨日の日付、next7Daysは今日から7日後の日付を表す
  // switch文を使って、filterの値に基づいてフィルタリング方法を変更している
  // 例えば、filterが "Today" の場合、setFilteredPostsでposts配列から今日の日付と一致するものをフィルタリングして、新しい配列をセットしている
  // case "All"では、today以降のすべてのタスクをフィルタリングし、case "Completed"では、yesterday以前に完了したタスクをフィルタリングしている
  // case "Next7Days"では、next7Days以内に開始されるタスクをフィルタリングしている
  // それぞれの場合において、setFilteredPostsで新しい配列をセットしている
  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);
    switch (filter) {
      case "Today":
        setFilteredPosts(
          posts.filter((post) => formatDate(filter) === formatDateforFirebase(post.start))
        );
        break;
      case "Tomorrow":
        setFilteredPosts(
          posts.filter((post) => formatDate(filter) === formatDateforFirebase(post.start))
        );
        break;
      case "Next7Days":
        setFilteredPosts(
          posts.filter(
            (post) =>
              new Date(post.start) <= next7Days && new Date(post.start) >= today
          )
        );
        break;
      case "Completed":
        setFilteredPosts(posts.filter((post) => new Date(post.start) <= yesterday));
        break;
      case "All":
        setFilteredPosts(
          posts.filter((post) => new Date(post.start) >= today)
        );
        break;
      default:
        break;
    }
    // コンポーネントがマウントされた後に posts 配列と filter 値に基づいて、各日付フィルターのタスクリストの数を計算し、daysFilterTaskList オブジェクトに格納している
    const daysFilterTaskList = {
      All: posts.filter((post) => new Date(post.start) >= today).length,
      Today: posts.filter((post) => formatDate("Today") === formatDateforFirebase(post.start)).length,
      Tomorrow: posts.filter((post) => formatDate("Tomorrow") === formatDateforFirebase(post.start)).length,
      Next7Days: posts.filter((post) => new Date(post.start) > today && new Date(post.start) <= next7Days).length,
      Completed: posts.filter((post) => new Date(post.start) <= yesterday).length,
    };
    // setFilteredPostsLength 関数を使用して、フィルタリングされたタスクの数を daysFilterTaskList オブジェクトに設定する
    // このようにすることで、コンポーネントの状態を更新し、再レンダリングする、また、posts と filter の変更を監視し、変更があった場合に再計算を行う
    setFilteredPostsLength(daysFilterTaskList);
  }, [posts, filter]);


  useEffect(() => {
    setPriorityFilteredPost(filteredPosts.filter((post) => post.priority === filterOption));
  }, [filteredPosts, filterOption])

  // タスクの削除機能
  // handleDeletePostという関数は、引数として削除する対象のタスク(targetPost)を受け取る
  // まず、setPosts関数を使って、対象のタスクを配列から削除、
  // その後、削除が実行されたことをFirestoreに反映するために、awaitを使ってdeleteDoc関数を実行
  // 最後に、routerを使って、Tasks/Allに移動
  const handleDeletePost = async (targetPost: ITodoData) => {
    setPosts(posts.filter((post) => post !== targetPost))
    await deleteDoc(doc(db, "users", userItem.uid, "posts", targetPost.id));
    router.push({
      pathname: `/Tasks/All`,
    });
  }

  // postDataオブジェクトをCloud Firestoreデータベースに追加する
  // 具体的には、setDoc関数を使用して、"users"コレクションのuserItem.uidドキュメントの"posts"コレクションにpostDataを追加している
  // データベース内のドキュメントは、postDataのidフィールドを使用して識別される
  /**
   * @param postData
   */
  const postAddTask = async (postData: ITodoData) => {
    setDoc(doc(db, "users", userItem.uid, "posts", postData.id), postData);
  };

  return (
    <>
      <Box>
        <form
          onSubmit={onAddFormSubmit}
        >
          <Input
            fontSize="sm"
            mt={2}
            mb={2}
            name="title"
            placeholder='+ Enterキーを押して保存します。'
            autoFocus
            value={form}
            onChange={handleAddFormChanges}
          />
        </form>

        {filterOption === "All" ? (
          <Stack>
            {filteredPosts && filteredPosts.map((post) => (
              <>
                <HStack
                  cursor="pointer"
                  onClick={() => {
                    setTodo(post)
                    router.push({
                      pathname: `/Tasks/All/${post.id}`,
                      query: JSON.stringify(post),
                      // search: `?${query}`,
                    });
                  }}
                  borderRadius="lg"
                  _hover={{
                    bg: 'gray.600',
                    color: 'white'
                  }}
                >
                  <Box
                    key={post.id}
                  >

                    <Box pl={2}
                    >
                      <MinusIcon
                        mr={3}
                        fontSize
                        ="11"
                        color={colors[post.priority as 'High' | 'Middle' | 'Low']}
                      />
                      <a>{post.title}</a>
                    </Box>
                  </Box>

                  <Spacer />
                  <Box
                    fontSize="sm"
                  >
                    {post.start ? new Date(post.start).toLocaleDateString() : ""}
                  </Box>


                  <Box>
                    <IconButton
                      variant='outline'
                      color='red.800'
                      aria-label='DeleteIcon'
                      border="0"
                      onClick={() => handleDeletePost(post)}
                      icon={<DeleteIcon />}
                    />
                  </Box>

                </HStack >
              </>
            ))}
          </Stack >) : (
          <Stack>
            {filteredPosts && filteredPosts.map((post: any) => (
              <>
                <HStack
                  cursor="pointer"
                  onClick={() => {
                    setTodo(post)
                    router.push({
                      pathname: `/Tasks/All/${post.id}`,
                      query: JSON.stringify(post),
                      // query: post
                      // 上記の書き方でないと1度のクリックで開けない
                    })
                  }}
                  borderRadius="lg"
                  _hover={{
                    bg: 'gray.600',
                    color: 'white'
                  }}
                >
                  <Box
                    key={post.id}
                  >

                    <Box pl={2}>
                      <MinusIcon
                        mr={3}
                        fontSize="11"
                        color={colors[post.priority ?? "Undefined"]}
                      />
                      <a>{post.title}</a>
                    </Box>
                  </Box>

                  <Spacer />
                  <Box
                    fontSize="sm"
                  >
                    {post.start ? new Date(post.start).toLocaleDateString() : ""}
                  </Box>

                  <Link
                    href='../Tasks/All' passHref
                  >
                    <Box>
                      <IconButton
                        variant='outline'
                        color='red.800'
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
        )
        }
      </Box >
    </>
  );
}