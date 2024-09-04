import { collisionDetection, randomTetromino } from "@/components/gameHelper"
import { useCallback, useState } from "react"
import { rows, columns } from "@/components/gameHelper"
import { log } from "console"
import { StageProp } from "./useStage"
export type PLAYER = {
  pos: {
    row: number
    col: number
  }
  tetromino: (string | number)[][]
  collided: boolean
}

export const usePlayer = () => {
  const [player, setPlayer] = useState({} as PLAYER)

  const updatePlayerPos = ({
    x,
    y,
    collided,
  }: {
    x: number
    y: number
    collided: boolean
  }): void => {
    setPlayer((prev) => ({
      ...prev,
      pos: { row: prev.pos.row + x, col: prev.pos.col + y },
      collided,
    }))
  }

  const rotate = (stage: PLAYER["tetromino"]) => {
    const rowsToColumns = stage.map((_, index) =>
      stage.map((row) => row[index])
    )

    return rowsToColumns.map((row) => row.reverse())
  }

  const playerRotate = (stage: StageProp, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player))
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino)

    const pos = player.pos.col
    let extraSpace = 1
    while (collisionDetection(clonedPlayer, stage, { row: 0, col: 0 })) {
      clonedPlayer.pos.col += extraSpace
      extraSpace = -(extraSpace + (extraSpace > 0 ? 1 : -1))

      if (extraSpace > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino)

        clonedPlayer.pos.col = pos
        return
      }
    }
    setPlayer(clonedPlayer)
  }

  const resetPlayer = useCallback((): void => {
    setPlayer({
      pos: { row: 0, col: columns / 2 - 2 },
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }, [])
  return { player, updatePlayerPos, resetPlayer, playerRotate }
}
