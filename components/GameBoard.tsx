import { TETROMINOS } from "@/components/tetrominos"
import { type } from "os"
import Cell from "./Cell"

export type CellProp = [keyof typeof TETROMINOS, string]
export type StageProp = CellProp[][]

type Prop = {
  stage: StageProp
}

export const GameBoard = ({ stage }: Prop) => {
  return (
    <div className="border border-black ">
      {stage.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((col, colIndex) => (
            <div key={colIndex}>
              <Cell type={col[0]} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
