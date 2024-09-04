import { TETROMINOS } from "@/components/tetrominos"
import React, { memo } from "react"

type TypeProp = {
  type: keyof typeof TETROMINOS
}
const Cell: React.FC<TypeProp> = ({ type }) => {
  return (
    <div
      className={`${
        type !== 0 ? TETROMINOS[type].color : "bg-zinc"
      } w-6 h-6 border border-black`}
    ></div>
  )
}
export default memo(Cell)
