import React from 'react'
import { } from '@chakra-ui/icons'
import { Box, Input, Textarea, Button, Container } from "@chakra-ui/react"
import { doc, setDoc } from 'firebase/firestore'
import db from "../hooks/firebase"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import { ITodoData } from '../interfaces/todo'

export default function AddTodoForm() {
  const router = useRouter()

  /**
   * タスクを追加する
   * @param postData 送信するデータ
   */
  const postAddTask = async (postData: ITodoData) => {
    /**
     * Firebaseに送信する
     */
    const post = setDoc(doc(db, "posts", postData.id), postData);

    /**
     * Firebase送信後の処理
     */
    post.then(() => {
      // ホームに遷移する
      router.push("./")
    })
  };

  /**
   * 変更イベントで呼び出される関数
   * @param e HTMLイベント
   */
  const onAddFormSubmit = (e: any) => {
    // 本来のSubmitの機能を停止
    e.preventDefault();

    const postData: ITodoData = {
      id: uuidv4(),
      title: e.target.elements["title"].value,
      detail: e.target.elements["detail"].value
    }
    postAddTask(postData);
  }

  return (
    <Container>
      <form onSubmit={onAddFormSubmit}>
        <Box>タスクの生成</Box>
        <label htmlFor="todo"></label>
        <Input name="title" focusBorderColor='lime' placeholder='タイトル' autoFocus />
        <Textarea name="detail" placeholder='テキスト' />
        <Button type="submit" colorScheme='teal'>追加</Button>
      </form>
    </Container>
  )
}

export { }