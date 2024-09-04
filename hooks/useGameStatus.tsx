import { useEffect, useState } from "react"

export const useGameStatus = (rowsCleared: number) => {
  const [rows, setRows] = useState(0)
  const [level, setLevel] = useState(0)
  const [score, setScore] = useState(0)

  const points = [40, 100, 300, 1200]
  //   console.log(rowsCleared)

  useEffect(() => {
    if (rowsCleared > 0) {
      setScore((prev) => prev + points[rowsCleared - 2] * level)
      setRows((prev) => prev + rowsCleared - 1)
    }
    console.log(score)
  }, [rowsCleared])

  return { rows, setRows, level, setLevel, score, setScore }
}
