import type { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import {  } from '@chakra-ui/icons'
import { Container, Stack, Box, Input, Textarea, Button } from "@chakra-ui/react"
import {doc, serverTimestamp, setDoc} from 'firebase/firestore'
import db from "../hooks/firebase"
import {v4 as uuidv4} from "uuid"
import { useRouter } from 'next/router'

export default function AddTodoForm() {
  const router = useRouter()
  // const unCreatable = todo === ''
  const newTask = async (
    inputData:string,
    textData:string,
    priorityData:string,)  => {
    //Firebase ver9 compliant (modular)
    const id = uuidv4();
    const post = setDoc(doc(db, "posts",id), {
      id,
      title:inputData,
      text:textData,
      priority:priorityData,
      create: serverTimestamp(),
      update: serverTimestamp()
    });
    post.then(() => {
      router.push("./todos")
      uuidv4();
    })
  };

  const onAddFormSubmit = (e:any) => {
    // formを使っているときだけ
    e.preventDefault();
    const input = e.target.elements["title"].value
    const text = e.target.elements["detail"].value
    const priority = e.target.elements["priority"].value
    // const priority = e.target.element[2].value
    // console.log(e.target["priority"].value)
    newTask(input,text,priority)
  }

let random = Math.random() * 11;
console.log( random );

  return (
    <>
      <Box>
        <Box>Todo作成</Box>
      </Box>

      <form onSubmit={onAddFormSubmit}>
      <Box>Create</Box>
      <label htmlFor="todo"></label>

        <Box>タイトル</Box>
        <Input focusBorderColor='lime' placeholder='タイトル' />

        <Box>詳細</Box>

        <Textarea placeholder='テキスト' />

        
        <Button colorScheme='teal'>追加</Button>

      <Link href="./">
      </Link>
      </form>
    </>
  )
}

export {}

{/* <Container>
<Stack spacing={3}>

<Box>create</Box>
<Input focusBorderColor='lime' placeholder='タイトル' />

<Textarea placeholder='テキスト' />

<Input
 placeholder="時間"
 size="md"
 type="datetime-local"
/>
<Button colorScheme='teal'>追加</Button>

</Stack>
</Container> */}