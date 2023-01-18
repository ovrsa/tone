import { Select } from '@chakra-ui/react'

export const PriorityFilter = ({ filterOption, setFilterOption }: any) => {

  const handleNewTask = (event: any) => {
    setFilterOption(event.target.value)
  }

  return (
    <div>
      <Select value={filterOption} placeholder='Priority' onChange={handleNewTask}>
        <option value='All'>All</option>
        <option value='High'>High</option>
        <option value='Middle'>Middle</option>
        <option value='Low'>Low</option>
      </Select>
    </div>
  )
}