import { UpDownIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
} from '@chakra-ui/react';

type props = {
  todo: any;
  setTodo: any
}

// PriorityButton：優先度ボタン
export const PriorityButton = ({ todo, setTodo }: props) => {
  return (
    <Flex justifyContent="center" mt={4}>
      {todo.priority}
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="More server options"
            icon={<UpDownIcon />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                // bg={rest.filter === name ?
                //   'cyan.400'
                //   : ""}
                rightIcon={<CheckIcon />}
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
}