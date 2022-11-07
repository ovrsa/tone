import { AddIcon, ArrowRightIcon, CalendarIcon, CheckCircleIcon, CheckIcon, DeleteIcon, EditIcon, SearchIcon, TimeIcon } from "@chakra-ui/icons";

// LinkItemの型
export interface LinkItemProps {
  name: string;
  icon: any;
}
// LinkItemの見た目データ
// Array: 配列操作を行うための
// LinkItemProps: LinkItemsのTS型
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Tasks', icon: AddIcon },
  { name: 'Memo', icon: EditIcon },
  { name: 'Search', icon: SearchIcon },
];

// LinkItemの見た目データ
export const MainItems = [
  { name: 'All', icon: CheckIcon },
  { name: 'Today', icon: TimeIcon },
  { name: 'Tomorrow', icon: ArrowRightIcon },
  { name: 'Next 7 Days', icon: CalendarIcon },
  { name: 'Completed', icon: CheckCircleIcon },
  { name: 'Trash', icon: DeleteIcon },
];
