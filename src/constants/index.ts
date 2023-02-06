import { AddIcon, ArrowRightIcon, CalendarIcon, CheckCircleIcon, CheckIcon, SettingsIcon, TimeIcon } from "@chakra-ui/icons";

// LinkItemの型
export interface LinkItemProps {
  name: string;
  icon: any;
}
// LinkItems：1層の文字、アイコンデータ
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Tasks', icon: AddIcon },
  // { name: 'Setting', icon: SettingsIcon }
];

// MainItems：2層の文字、アイコンデータ
export const MainItems = [
  { name: 'All', icon: CheckIcon },
  { name: 'Today', icon: TimeIcon },
  { name: 'Tomorrow', icon: ArrowRightIcon },
  { name: 'Next7Days', icon: CalendarIcon },
  { name: 'Completed', icon: CheckCircleIcon },
];
