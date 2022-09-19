import { Box, Textarea, Button, Input } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { postsState } from '../../atoms/atom';
import db from '../../hooks/firebase';
import { ITodoData } from '../../interfaces/todo';

const EditTodo: NextPage = () => {

  const router = useRouter();
  const [posts] = useRecoilState(postsState)
  const [currentTodo, setCurrentTodo] = useState<any>()

  // Firebaseから取得したデータを抽出
  const todo: ITodoData = posts.find((post: ITodoData) => {
    return post.id === router.query.id;
  });

  // setcurrent todoを初期化している
  useEffect(() => {
    setCurrentTodo(todo)
    console.log(todo)
  }, []);

  /**
   * タスクの更新
   * @param titleText 送信する詳細情報
   * @param detailText 送信する詳細情報
   */
  const postUpdateTask = async (e) => {
    e.preventDefault();
    /**
     * Firebaseに送信する
     */
    const post = setDoc(doc(db, "posts", todo.id), {
      id: todo.id,
      title: currentTodo.titleText,
      detail: currentTodo.detailText,
    });

    /**
     * Firebase送信後の処理
     */
    post.then(() => {
      // ホームに遷移する
      router.push("/")
    })
  }

  console.log({ ...currentTodo })

  return (
    <Box>
      <Box>タスクの編集</Box>
      <Link href="../">Back</Link>
      {/* idが当てはまるrecoilの値を抽出 */}
      {/* todoの情報が入っている場合のみ下を実行 */}
      {todo != null && currentTodo?.titleText != null &&
        <Box>
          {/* 前回保存したデータ */}
          <>
            <form onSubmit={postUpdateTask}>
              <Input
                name="titleText"
                placeholder="Basic usage"
                value={currentTodo.titleText}
                onChange={(e) => setCurrentTodo({ ...currentTodo, titleText: e.target.value })} />
              <Textarea
                name="detailText"
                value={currentTodo.detailText}
                placeholder='テキスト'
                onChange={(e) => setCurrentTodo({ ...currentTodo, detailText: e.target.value })} />
              <Button type="submit" colorScheme='teal'>更新</Button>
            </form>
          </>
        </Box>
      }
    </Box >

  )
}

export default EditTodo