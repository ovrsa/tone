import { Box, Textarea, Input, Flex } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { postsState, userItemState } from '../atoms/atom';
import db from '../lib/firebase';
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

  // useEffect(() => {
  //   if () {
  //     setTodo({
  //       id: query.id,
  //       priority: query.priority,
  //       share: query.share,
  //       start: query.start,
  //       detail: query.detail,
  //       title: query.title
  //     })
  //   }
  // }, [])

  /**
   * @param e
   */

  const postUpdateTask = async (e) => {
    e.preventDefault();

    const { id, title, detail, start, share, priority } = todo;
    const post = setDoc(doc(db, "users", userItem.uid, "posts", todo.id),
      { id, title, detail, start, share, priority });
    console.log(post);
  };

  return (
    <Box
      flex="1.6"
    >
      {todo && (
        <Box p={2}>
          <form onBlur={postUpdateTask}>
            {/* <Checkbox
            name="share"
            value={todo.share}
            size="md"
            onChange={(e) => {
              setTodo({ ...todo, share: e.target.value })
            }}
            >Google Calendarに共有
          </Checkbox> */}
            <Flex align="center" pb={2}>
              <PriorityButton todo={todo} setTodo={setTodo} />
              <Input
                name="start"
                value={todo.start}
                size="md"
                type="datetime-local"
                onChange={(e) => setTodo({ ...todo, start: e.target.value })}
              />
            </Flex>
            <Input
              mb={2}
              name="title"
              placeholder="title"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <Textarea

              name="detail"
              height="80vh"
              value={todo.detail}
              placeholder="detail"
              onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
            />
          </form>
        </Box>
      )}
    </Box>
  );
}
