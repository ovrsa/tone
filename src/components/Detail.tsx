import { Box, Textarea, Input, Flex } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userItemState } from '../atoms/atom';
import db from '../lib/firebase';
import { PriorityButton } from './PriorityButton';
import { ITodoData } from '../interfaces/todo';

type Props = {
  todo: ITodoData;
  setTodo: React.Dispatch<React.SetStateAction<ITodoData>>;
}

export const Detail: React.VFC<Props> = ({ todo, setTodo }) => {
  const { query, isReady } = useRouter();
  const [userItem] = useRecoilState(userItemState);

  useEffect(() => {
    if (isReady) {
      setTodo({
        id: query.id as string,
        priority: query.priority as 'High' | 'Middle' | 'Low' | '',
        start: query.start as string,
        detail: query.detail as string,
        title: query.title as string
      });
    }
  }, [isReady]);

  const postUpdateTask = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, title, detail, start, priority } = todo;
    await setDoc(doc(db, "users", userItem.uid, "posts", todo.id),
      { id, title, detail, start, priority });
  };

  return (
    <Box>
      {todo && (
        <Box>
          <form onBlur={postUpdateTask}>
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