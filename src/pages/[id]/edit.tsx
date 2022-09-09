import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { postsState } from '../../atoms/atom';

const EditTodo: NextPage = () => {
  // idから要素を取得
  // ----------------------------------------------------------------
  const router = useRouter();
  const [posts, setPosts] = useRecoilState(postsState)
  const todo = posts.filter((post: any) => {
    return post.id === router.query.id;
  });
  // ----------------------------------------------------------------

  return (
    <Box>
      <Box>Todo Edit</Box>
      <Link href="../">Back</Link>
      {/* idが当てはまるrecoilの値を抽出 */}
      <Box>
        {todo.map((post: any) => (
          <>
            <Box key={post.title}>
              <Box>{post.title}</Box>
            </Box>

            <Box key={post.text}>
              {post.text}
            </Box>
          </>
        ))}
      </Box>
    </Box>
  )
}

export default EditTodo