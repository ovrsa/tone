import {
  AddIcon,
  EditIcon,
  SearchIcon,
} from '@chakra-ui/icons'
import React from 'react'

export const ControlbarData = [
  {
    title: "タスク",
    icon: <AddIcon />,
    link: "/home"
  },
  {
    title: "メモ",
    icon: <EditIcon />,
    link: "/home"
  },
  {
    title: "検索",
    icon: <SearchIcon />,
    link: "/home"
  }
]