import { Box, Select } from '@chakra-ui/react';

interface PriorityFilterProps {
  filterOption: string;
  setFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

export const PriorityFilter = ({ filterOption, setFilterOption }: PriorityFilterProps) => {
  const handleNewTask = (event: any) => {
    setFilterOption(event.target.value);
  };

  return (
    <Box m={2}>
      <Select value={filterOption} placeholder='Priority' onChange={handleNewTask}>
        <option value='All'>All</option>
        <option value='High'>High</option>
        <option value='Middle'>Middle</option>
        <option value='Low'>Low</option>
      </Select>
    </Box>
  );
};
