import React from 'react'
import {  } from '@chakra-ui/icons'
import { Box, Input, Textarea, Button, Container } from "@chakra-ui/react"
import {doc, setDoc} from 'firebase/firestore'
import db from "../hooks/firebase"
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/router'

export default function AddTodoForm() {
  const router = useRouter()
  const newTask = async (
    inputData:string,
    textData:string)  => {
    //Firebase ver9 compliant (modular)
    const id = uuidv4();
    const post = setDoc(doc(db, "posts",id), {
      id,
      title:inputData,
      text:textData,
    });
    post.then(() => {
      router.push("./")
      uuidv4();
    })
  };

  const onAddFormSubmit = (e:any) => {
    e.preventDefault();
    const input = e.target.elements["title"].value
    const text = e.target.elements["detail"].value
    newTask(input,text)
  }

  return (
    <Container>
      <form onSubmit={onAddFormSubmit}>
      <Box>Create</Box>
      <label htmlFor="todo"></label>

        <Input 
        name="title" 
        focusBorderColor='lime' 
        placeholder='タイトル' 
        autoFocus
        />
  
        <Textarea 
        name="detail" 
        placeholder='テキスト' 
        />

        <Button 
        type="submit" 
        colorScheme='teal'
        >
          追加
        </Button>

      </form>
    </Container>
  )
}

export {}