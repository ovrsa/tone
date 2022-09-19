import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { postsState } from '../../atoms/atom';

const TodoId: NextPage = () => {
  // idから要素を取得
  // ----------------------------------------------------------------
  const router = useRouter();
  const [posts] = useRecoilState(postsState)
  const todo = posts.filter((post: any) => {
    return post.id === router.query.id;
  });
  // ----------------------------------------------------------------

  console.log(todo);
  return (
    <Box>
      <Box>Todo Detail</Box>
      <Link href="../">Back</Link>
      {/* idが当てはまるrecoilの値を抽出 */}
      <Box>
        {todo.map((post: any) => (
          <>
            <Box key={post.title}>
              {post.title}
            </Box>

            <Box key={post.detail}>
              {post.detail}
            </Box>
          </>
        ))}
      </Box>
    </Box>
  )
}

export default TodoId