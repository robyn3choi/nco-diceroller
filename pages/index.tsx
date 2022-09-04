import io from "socket.io-client"
import { useEffect, useState } from "react"
import DiceNumberSelect from "../components/DiceNumberSelect"

let socket

type RollResult = {
  actionDice: number[]
  dangerDice: number[]
  result: number
  text: string
}

export default function Home() {
  const [actionDiceCount, setActionDiceCount] = useState(1)
  const [dangerDiceCount, setDangerDiceCount] = useState(1)
  const [rollResult, setRollResult] = useState<RollResult>()
  const [last3RollResults, setLast3RollResults] = useState([])

  useEffect(() => {
    async function initSocket() {
      await fetch("/api/socket")
      socket = io()

      socket.on("connect", () => {
        console.log("connected")
      })
      socket.on("rolled", ({ actionDice, dangerDice }) => {
        const actionDiceCopy = [...actionDice]
        const dangerDiceCopy = [...dangerDice]

        let sixes = 0
        for (let a = 0; a < actionDiceCopy.length; a++) {
          for (let d = 0; d < dangerDiceCopy.length; d++) {
            if (actionDiceCopy[a] === 6) {
              sixes++
            }
            if (actionDiceCopy[a] === dangerDiceCopy[d]) {
              actionDiceCopy[a] = 0
              dangerDiceCopy[d] = 0
            }
          }
        }
        const result = Math.max(...actionDiceCopy)
        let text = "Partial Success"
        if (result === 6) {
          text = "Success!"
          if (sixes > 1) {
            const boons = sixes - 1
            text = `Success with ${boons} boon${boons > 1 ? "s" : ""}!`
          }
        } else if (result < 4) {
          text = "Failed"
          if (result <= 1) {
            text = "Botched!"
          }
        }
        setRollResult({ actionDice, dangerDice, result, text })
      })
    }
    initSocket()
  }, [])

  function roll() {
    console.log("roll")
    socket.emit("roll", { actionDiceCount, dangerDiceCount })
  }

  return (
    <div>
      <DiceNumberSelect label="Action dice" value={actionDiceCount} onChange={setActionDiceCount} />
      <DiceNumberSelect label="Danger dice" value={dangerDiceCount} onChange={setDangerDiceCount} />
      <button onClick={roll}>Roll</button>
      <div>{rollResult?.actionDice.map((die) => die)}</div>
      <div>{rollResult?.dangerDice.map((die) => die)}</div>
      <div>{rollResult?.result}</div>
      <div>{rollResult?.text}</div>
    </div>
  )
}
