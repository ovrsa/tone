// 優先度を設定するためのポップオーバーの機能を提供するためのコンポーネント 
// PriorityButton を定義している

import { UpDownIcon } from '@chakra-ui/icons';
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, IconButton, Button, Stack, Flex } from '@chakra-ui/react';

type Props = {
  todo: {
    id: string;
    priority: string;
    start: string;
    detail: string;
    title: string;
  };
  setTodo: React.Dispatch<React.SetStateAction<{
    id: string;
    priority: string;
    start: string;
    detail: string;
    title: string;
  }>>;
};

// Props 型が定義されており、todoプロパティにはtodoアイテムの情報が含まれる
// setTodo プロパティには、todoアイテムの情報を更新するための関数が含まれる
// setTodo プロパティは、React.Dispatch の SetStateAction を使用して、todoアイテムの情報を更新する

// React では、状態がオブジェクトや配列などの複雑な値の場合、
// 状態を安全に更新するために、既存の状態を直接変更しないというルールがある
// React.Dispatch は、このルールを守るための仕組みで、 useState フックを使って状態を管理している場合、
// この React.Dispatch 型の変数に set 関数を代入することができる
// そして、この React.Dispatch 型の set 関数に、新しい状態を返す関数、または新しい状態の値を直接渡すことで状態を更新することができる

export const PriorityButton = ({ todo, setTodo }: Props) => (
  <Flex justifyContent="center" pr={2} align="center" >
    {/* IconButton をクリックすると、優先度の設定ができる Popover が表示される
    Popover 内には、4つの異なる優先度を表す Button が用意されており
    それぞれの Button をクリックすることで、選択した優先度が表示される */}

    <Popover placement="bottom" isLazy>
      <PopoverTrigger>
        <IconButton aria-label="More server options" icon={<UpDownIcon />} variant="solid" w="fit-content" />
      </PopoverTrigger>
      <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            <Button
              onClick={() => setTodo({ ...todo, priority: "High" })}
              w="130px"
              variant="ghost"
              justifyContent="space-between"
              fontWeight="normal"
              colorScheme="red"
              fontSize="sm">
              High
            </Button>
            <Button
              onClick={() => setTodo({ ...todo, priority: "Middle" })}
              w="130px"
              variant="ghost"
              justifyContent="space-between"
              fontWeight="normal"
              colorScheme="yellow"
              fontSize="sm">
              Middle
            </Button>
            <Button
              onClick={() => setTodo({ ...todo, priority: "Low" })}
              w="130px"
              variant="ghost"
              justifyContent="space-between"
              fontWeight="normal"
              colorScheme="blue"
              fontSize="sm">
              Low
            </Button>
            <Button
              onClick={() => setTodo({ ...todo, priority: "None" })}
              w="130px"
              variant="ghost"
              justifyContent="space-between"
              fontWeight="normal"
              fontSize="sm">
              None
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </Flex>
);