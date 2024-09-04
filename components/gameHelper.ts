import { TETROMINOS } from "./tetrominos"
import { PLAYER } from "@/hooks/usePlayer"
import { StageProp } from "@/hooks/useStage"

export const rows: number = 20
export const columns: number = 12

export const createStage = () =>
  Array.from({ length: rows }, () => Array(columns).fill([0, "clear"]))

export const randomTetromino = () => {
  const tetromino: string = "ISZTOLJ"
  const random = tetromino[
    Math.floor(Math.random() * tetromino.length)
  ] as keyof typeof TETROMINOS

  return TETROMINOS[random]
}

export const collisionDetection = (
  player: PLAYER,
  stage: StageProp,
  { row: rowX, col: rowY }: { row: number; col: number }
) => {
  for (let i = 0; i < player.tetromino.length; i++) {
    for (let j = 0; j < player.tetromino[i].length; j++) {
      if (player.tetromino[i][j] !== 0) {
        if (
          !stage[i + player.pos.row + rowX] ||
          !stage[i + player.pos.row + rowX][j + player.pos.col + rowY] ||
          stage[i + player.pos.row + rowX][j + player.pos.col + rowY][1] !==
            "clear"
        ) {
          return true
        }
      }
    }
  }
}
