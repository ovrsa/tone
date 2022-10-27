import { Box, Textarea, Button, Input, Checkbox, Flex } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useEffect } from 'react';
// import { BsChevronDoubleRight } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { postsState } from '../atoms/atom';
import db from '../hooks/firebase';
import { ITodoData } from '../interfaces/todo';

// (pages/task/All/[id]/index.tsx)からpropsでstateとstateの更新関数を使う形
type props = {
  todo: any;
  setTodo: any
}

export const Detail = ({ todo, setTodo }: props) => {
  const { query, isReady } = useRouter();
  const [posts] = useRecoilState(postsState)

  /**
   * recoilに保存した投稿の一覧からidが同じ投稿を抜き出して、
   * todoの変数に格納する
   **/

  // todo: setTodoに保存(useState)
  // posts.find: postの中からある値を探し出す
  // post.id === query.id: useRouter内の{query}とidが被っているもの

  // useRouterからpostのidが取得できたら、setTodoにtodoをセットする
  // * つまり、isReadyがtrue = idが取得出来ている状態なので、idが一致するpostがtodoに格納されている
  // * 今回の場合はsetTodoに値が入ったタイミングでisReadyがtrueになる
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
  // postUpdateTaskという関数を作成
  const postUpdateTask = async (e: any) => {
    // デフォルトの動作をキャンセル
    // 今回の場合、formの送信に伴う画面のレンダリングを制御
    e.preventDefault()

    // todoからtitleとdetailを分割代入し、setDocで直接指定できるような形に変換
    const { id, title, detail, start } = todo

    // Firebaseに送信する
    /**
   * 更新するタスクのオブジェクトに渡すプロパティ
   * @param id 
   * @param title
   * @param detail
   * @param start

   */
    // 第一引数で既存recoilのpostsから情報を引き出す
    // 第二引数入力した値を第一引数に上書きする、つまり更新
    const post = setDoc(
      doc(db, "posts", id), // 第一引数
      { id, title, detail, start } // 第二引数
    );
  }

  return (
    <Box
      flex={"1"}>
      {/* todoの情報が入っている場合のみ以下の部分をレンダリング */}
      {/* undefined: 値が代入されていない状態 */}
      {/* !=: ==の逆 */}
      {/* &&(論理積): 全てがtrueである場合のみtrue */}
      {todo !== undefined &&
        <Box pl={12}>
          <Checkbox defaultChecked>共有</Checkbox>
          {/* 前回保存したデータ */}
          <>
            {/* onSubmit: 送信ボタンが押された際に起動するイベント */}
            {/* postUpdateTaskを発火させる */}
            <form onSubmit={postUpdateTask}>
              <Flex>日時
                <Input
                  name="start"
                  value={todo.start}
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  onChange={(e) => setTodo({ ...todo, start: e.target.value })} />
              </Flex>
              <Input
                // name: 入力欄コントロールの名前、フォームと一緒に送信される
                name="title"
                placeholder="title"
                // value: 初期値
                value={todo.title}
                // onchangeは入力欄や選択肢が変更された時に発生するイベント<input>、<select>、及び<textarea>要素で対応
                // (e):イベントが発生したタイミングでsetTodoを呼び出す
                // ...: スプレッド記法、式を複数の要素に展開して、それぞれ関数呼び出す
                // reactを使用する場合、直接オブジェクトの値を変更するのはアンチパターンなので
                // 一度オブジェクトを展開して新しいオブジェクトを作成した上でuseStateでstateを更新する
                // title: e.target.value: titleに入力された値を取得
                onChange={(e) => setTodo({ ...todo, title: e.target.value })} />

              {/* テキストエリアもやっていること事は同じ */}
              <Textarea
                name="detail"
                value={todo.detail}
                placeholder='Description'
                onChange={(e) => setTodo({ ...todo, detail: e.target.value })} />
              <Button type="submit" colorScheme='teal'>更新</Button>
            </form>
          </>
        </Box>
      }
    </Box >

  )
}
