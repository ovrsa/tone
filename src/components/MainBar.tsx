// useRecoilValueを使い、filteredPostsLengthStateを取得
// MainBar:2層目を成すコンポーネント
// filter: 現在のフィルター状態
// setFilter: フィルター状態の変更関数
// filterOption: 現在のフィルターオプション
// setFilterOption: フィルターオプションの変更関数
import { filteredPostsLengthState } from "@atoms/atom"
import { Box, Spacer } from "@chakra-ui/react"
import { MainItems } from "@constants"
import { useState, useEffect } from "react"
import { useRecoilValue } from "recoil"
import { NavItem } from "./NavItem"
import { PriorityFilter } from "./PriorityFilter"

export const MainBar = ({ filter, setFilter, filterOption, setFilterOption }: any) => {
  const [daysFilterTaskList, setDaysFilterTaskList] = useState<any>([])
  const daysFilterTaskListData = useRecoilValue(filteredPostsLengthState)

  useEffect(() => {
    if (!daysFilterTaskListData) return
    setDaysFilterTaskList(daysFilterTaskListData)
  }, [daysFilterTaskListData])
  return (
    <Box>
      <PriorityFilter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      {
        // リンクのリストをmap関数で作成し、NavItemコンポーネントを返す
        MainItems.map((link: any) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            filter={filter}
            name={link.name}
            onClick={() => setFilter(link.name)}
          >
            {/* リンク名を表示 */}
            <Box>
              {link.name}
            </Box>
            <Spacer />

            {/* リンクのタスク数を表示 */}
            <Box fontSize="sm">
              {daysFilterTaskList[link.name]}
            </Box>
          </NavItem>
        ))
      }
    </Box>
  )
}
