import {
  CheckCircleIcon,
  CheckIcon,
  DeleteIcon
} from '@chakra-ui/icons'
import React from 'react'

export const SidebarData = [
  {
    title: "今日",
    icon: <CheckIcon />,
    link: "../pages/index.tsx"
  },
  {
    title: "完了",
    icon: <CheckCircleIcon />,
    link: "/home"
  },
  {
    title: "ゴミ箱",
    icon: <DeleteIcon />,
    link: "/home"
  }
]