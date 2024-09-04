"use client"

import { columns, createStage } from "@/components/gameHelper"
import { type } from "os"
import { useEffect, useState } from "react"
import { PLAYER } from "./usePlayer"
import { log } from "console"

export type CellProp = [string | number, string]
export type StageProp = CellProp[][]

export const useStage = (player: PLAYER, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage)
  const [rowsCleared, setRowsCleared] = useState(0)

  useEffect(() => {
    if (!player.pos) return
    setRowsCleared(0)

    const sweepRows = (stage: StageProp): StageProp => {
      return stage.reduce((ack, row) => {
        if (row.findIndex((col) => col[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1)
          console.log(rowsCleared)

          ack.unshift(
            new Array(stage[0].length).fill([0, "clear"]) as CellProp[]
          )
          return ack
        }
        ack.push(row)
        return ack
      }, [] as StageProp)
    }

    const updateStage = (prevStage: StageProp): StageProp => {
      const newStage = prevStage.map(
        (row) =>
          row.map((col) =>
            col[1] === "clear" ? [0, "clear"] : col
          ) as CellProp[]
      )

      player.tetromino.forEach((row, x) =>
        row.forEach((value, y) => {
          if (value !== 0) {
            newStage[x + player.pos.row][y + player.pos.col] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ]
          }
        })
      )

      if (player.collided) {
        resetPlayer()
        return sweepRows(newStage)
      }
      return newStage
    }
    setStage((prev) => updateStage(prev))
  }, [player])

  return { stage, setStage, rowsCleared }
}
