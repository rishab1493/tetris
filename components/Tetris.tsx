"use client"

import { createStage } from "@/components/gameHelper"
import { GameBoard } from "./GameBoard"
import { KeyboardEventHandler, useEffect, useState } from "react"
import { Button } from "./Button"
import { usePlayer } from "@/hooks/usePlayer"
import { useStage } from "@/hooks/useStage"
import { collisionDetection } from "@/components/gameHelper"
import { useInterval } from "@/hooks/useInterval"
import { Display } from "./Display"
import { useGameStatus } from "@/hooks/useGameStatus"

export const Tetris = () => {
  const [gameOver, setGameOver] = useState(false)
  const [dropTime, setDropTime] = useState<number | null>(null)
  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer()
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer)
  const { rows, setRows, level, setLevel, score, setScore } =
    useGameStatus(rowsCleared)

  const startGame = (): void => {
    setStage(createStage)
    resetPlayer()
    setDropTime(1000)
    setRows(0)
    setLevel(1)
    setScore(0)
    setGameOver(false)
  }

  const moveLeftOrRight = ({
    row,
    col,
    collided,
  }: {
    row: number
    col: number
    collided: boolean
  }): void => {
    if (!collisionDetection(player, stage, { row: row, col: col })) {
      updatePlayerPos({ x: row, y: col, collided: collided })
    }
  }
  const moveDown = ({
    row,
    col,
    collided,
  }: {
    row: number
    col: number
    collided: boolean
  }): void => {
    if (rows > level * 10) {
      setLevel((prev) => prev + 1)
      setDropTime((1000 / level) * 200)
    }
    if (!collisionDetection(player, stage, { row: row, col: col })) {
      updatePlayerPos({ x: row, y: col, collided: collided })
    } else {
      if (player.pos.row < 1) {
        console.log("game over")
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }
  const down = () => {
    moveDown({ row: 1, col: 0, collided: false })
    setDropTime(null)
  }
  useInterval(() => {
    moveDown({ row: 1, col: 0, collided: false })
  }, dropTime)
  const movement = ({ key }: { key: string }) => {
    if (!gameOver) {
      if (key === "ArrowLeft") {
        moveLeftOrRight({ row: 0, col: -1, collided: false })
      } else if (key === "ArrowRight") {
        moveLeftOrRight({ row: 0, col: 1, collided: false })
      } else if (key === "ArrowDown") {
        down()
      } else if (key === "ArrowUp") {
        playerRotate(stage, 1)
      }
    }
  }

  const keyUp = ({ key }: { key: string }) => {
    if (!gameOver) {
      if (key === "ArrowDown") {
        setDropTime(1000)
      }
    }
  }
  useEffect(() => {
    const focusedDiv = document.getElementById("tetris-container")
    if (focusedDiv) {
      focusedDiv.focus()
    }
  }, [])
  return (
    <div
      onKeyDown={movement}
      onKeyUp={keyUp}
      id="tetris-container"
      role="button"
      tabIndex={0}
      className="flex justify-center items-center h-screen bg-zinc"
    >
      <GameBoard stage={stage} />
      <div className="flex flex-col px-8 gap-5">
        {gameOver ? (
          <div>
            <Display name="Game Over" />
            <Display name={`Score: ${score}`} />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <Display name={`Score: ${score}`} />
            <Display name={`Level: ${level}`} />
            <Display name={`Rows: ${rows}`} />
          </div>
        )}
        <Button onClick={startGame} type={"Start Game"} />
      </div>
    </div>
  )
}
