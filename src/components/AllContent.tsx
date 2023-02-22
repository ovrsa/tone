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
  const [posts, setPosts] = useRecoilState<ITodoData[]>(postsState);
  const [userItem] = useRecoilState(userItemState);
  const [filteredPosts, setFilteredPosts] = useState<ITodoData[]>([]);
  const [priorityFilteredPost, setPriorityFilteredPost] = useState<ITodoData[]>([]);
  const router = useRouter()
  const colors = { High: "red.300", Middle: "yellow.300", Low: "blue.300" }
  const setFilteredPostsLength = useSetRecoilState(filteredPostsLengthState)
  const [form, setForm] = useState<string>('');

  const handleAddFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  }

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
  const onAddFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData: ITodoData = {
      id: uuidv4(),
      title: e.currentTarget.elements["title"].value.trim(),
      detail: '',
      start: makeStringDate(),
      priority: '',
    }
    if (postData.title === '') {
      return;
    }
    postAddTask(postData);
    setForm('');
  }

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
  }, [postsState, userItemState])


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

    const daysFilterTaskList = {
      All: posts.filter((post) => new Date(post.start) >= today).length,
      Today: posts.filter((post) => formatDate("Today") === formatDateforFirebase(post.start)).length,
      Tomorrow: posts.filter((post) => formatDate("Tomorrow") === formatDateforFirebase(post.start)).length,
      Next7Days: posts.filter((post) => new Date(post.start) > today && new Date(post.start) <= next7Days).length,
      Completed: posts.filter((post) => new Date(post.start) <= yesterday).length,
    };
    setFilteredPostsLength(daysFilterTaskList);

  }, [posts, filter]);


  useEffect(() => {
    setPriorityFilteredPost(filteredPosts.filter((post) => post.priority === filterOption));
  }, [filteredPosts, filterOption])

  const handleDeletePost = async (targetPost: ITodoData) => {
    setPosts(posts.filter((post) => post !== targetPost))
    await deleteDoc(doc(db, "users", userItem.uid, "posts", targetPost.id));
    router.push({
      pathname: `/Tasks/All`,
    });
  }

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
                      query: post
                    })
                  }}
                  borderRadius="lg"
                  _hover={{
                    bg: 'gray.600',
                    color: 'white'
                  }}
                >
                  <Box
                    key={post.title}
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
                      query: post
                    })
                  }}
                  borderRadius="lg"
                  _hover={{
                    bg: 'gray.600',
                    color: 'white'
                  }}
                >
                  <Box
                    key={post.title}
                  >

                    <Box pl={2}
                    >
                      <MinusIcon
                        mr={3}
                        fontSize="11"
                        color={colors[post.priority]}
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