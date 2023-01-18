import { Box, Textarea, Button, Input, Checkbox, Flex } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { postsState, userItemState } from '../atoms/atom';
import db from '../lib/firebase';
import { ITodoData } from '../interfaces/todo';
import { PriorityButton } from './PriorityButton';

// (pages/task/All/[id]/index.tsx)からpropsでstateとstateの更新関数を使う形
type props = {
  todo: any;
  setTodo: any
}

// Detail:4層目を成すコンポーネント
export const Detail = ({ todo, setTodo }: props) => {
  const { query, isReady } = useRouter();
  const [userItem] = useRecoilState(userItemState);
  const [posts] = useRecoilState(postsState)

  // isReady: routerが完全に準備出来ているかを示すフラグ
  // useEffectでしか使わないようにすること
  // https://qiita.com/Anders/items/ad91c6752c512716f82a
  useEffect(() => {
    if (isReady) {
      const todo: ITodoData = posts.find((post: ITodoData) => {
        return post.id === query.id;
      });
      setTodo(todo)
    }
    return
  }, [isReady]);

  /**
   * formのsubmitが行われたら実行される
   * Firebase上のデータをinputとtextareaに入力された値に基づいて編集
   * 更新された後にTopへ遷移
   * @param e
   */

  // postUpdateTask:タスクを編集する関数
  const postUpdateTask = async (e: any) => {
    e.preventDefault()

    // todoからtitleとdetailを分割代入し、setDocで直接指定できるような形に変換
    const { id, title, detail, start, share, priority } = todo
    // Firebaseに送信する
    /**
   * 更新するタスクのオブジェクトに渡すプロパティ
   * @param id 
   * @param title
   * @param detail
   * @param start
   * @param share
   * @param priority
   */
    // 第一引数で既存recoilのpostsから情報を引き出す
    // 第二引数入力した値を第一引数に上書きする、つまり更新
    const post = setDoc(doc(db, "users", userItem.uid, "posts", todo.id), // 第一引数
      { id, title, detail, start, share, priority } // 第二引数
    );
  }

  return (
    <Box
      flex={"1"}>
      {/* todoの情報が入っている場合のみ以下の部分をレンダリング */}
      {/* undefined: 値が代入されていない状態 */}
      {/* &&(論理積): 全てがtrueである場合のみtrue */}
      {todo !== undefined &&
        <Box pl={12}>
          <Checkbox
            name="share"
            value={todo.share}
            size="md"
            onChange={(e) => {
              setTodo({ ...todo, share: e.target.value })
            }}
          >Google Calendarに共有
          </Checkbox>
          {/* 前回保存したデータ */}
          <>
            <form onSubmit={postUpdateTask}>
              <PriorityButton todo={todo} setTodo={setTodo}></PriorityButton>
              <Flex>日時
                <Input
                  name="start"
                  value={todo && todo.start}
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  onChange={(e) => {
                    setTodo({ ...todo, start: e.target.value })
                  }} />
              </Flex>
              <Input
                name="title"
                placeholder="title"
                value={todo && todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })} />

              <Textarea
                name="detail"
                value={todo && todo.detail}
                placeholder='Description'
                onChange={(e) => setTodo({ ...todo, detail: e.target.value })} />
              <Button
                type="submit"
                colorScheme='teal'
              >
                更新
              </Button>
            </form>
          </>
        </Box >
      }
    </Box >

  )
}
