import io from "socket.io-client"
import { useEffect, useState } from "react"
import DiceNumberSelect from "../components/DiceNumberSelect"
import Die from "../components/Die"
import EnterName from "../components/EnterName"
import { Router, useRouter } from "next/router"

let socket

type RollResult = {
  actionDice: number[]
  dangerDice: number[]
  num: number
  text: string
  id: number
  playerName: string
}

export default function Home() {
  const router = useRouter()
  const [players, setPlayers] = useState<any[]>([])
  const [actionDiceCount, setActionDiceCount] = useState(1)
  const [dangerDiceCount, setDangerDiceCount] = useState(1)
  const [rollResult, setRollResult] = useState<RollResult>()
  const [last3RollResults, setLast3RollResults] = useState<RollResult[]>([])

  useEffect(() => {
    async function initSocket() {
      await fetch("/api/socket")
      socket = io()

      socket.on("connect", () => {
        console.log("joining")
        socket.emit("playerJoined", router.query.name)
      })

      socket.on("playersUpdated", (updatedPlayers) => {
        console.log(updatedPlayers)
        setPlayers(updatedPlayers)
      })

      socket.on("rolled", ({ actionDice, dangerDice, name }) => {
        const actionDiceCopy = [...actionDice]
        const dangerDiceCopy = [...dangerDice]

        for (let a = 0; a < actionDiceCopy.length; a++) {
          for (let d = 0; d < dangerDiceCopy.length; d++) {
            if (actionDiceCopy[a] === dangerDiceCopy[d]) {
              actionDiceCopy[a] = 0
              dangerDiceCopy[d] = 0
            }
          }
        }
        const num = Math.max(...actionDiceCopy)

        let text = "Partial Success"
        if (num === 6) {
          text = "Success!"
          const sixes = actionDiceCopy.filter((die) => die === 6).length
          if (sixes > 1) {
            const boons = sixes - 1
            text = `Success with ${boons} boon${boons > 1 ? "s" : ""}!`
          }
        } else if (num < 4) {
          text = "Failed"
          if (num <= 1) {
            text = "Botched!"
          }
        }
        const result = { actionDice, dangerDice, num, text, id: Date.now(), playerName: name }
        setRollResult(result)
        setLast3RollResults((prevState) => {
          const newArray = [result, ...prevState]
          if (newArray.length > 3) {
            newArray.pop()
          }
          return newArray
        })
      })
    }
    if (router.query.name) {
      initSocket()
    }
    return () => {
      if (socket) {
        socket.emit("playerLeft", router.query.name)
      }
    }
  }, [router.query.name])

  function roll() {
    socket.emit("roll", { actionDiceCount, dangerDiceCount })
  }

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl mb-4">Neon City Overdrive</h1>
      <div className="absolute top-8 text-lg text-lightblue">
        {players.map((p, i) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
      <div className="flex gap-8 justify-center items-center mt-10 mb-6">
        <DiceNumberSelect label="Action dice" value={actionDiceCount} isGood onChange={setActionDiceCount} />
        <button
          onClick={roll}
          className="border-2 border-pink hover:border-white hover:text-white rounded-full w-32 h-32 text-3xl"
        >
          Roll
        </button>
        <DiceNumberSelect label="Danger dice" value={dangerDiceCount} isGood={false} onChange={setDangerDiceCount} />
      </div>
      {rollResult && (
        <div className="text-2xl mt-10 mb-4">
          <span className="text-lightblue">{rollResult.playerName} </span>rolled:
        </div>
      )}
      <div className="flex gap-2 justify-center">
        {rollResult?.actionDice.map((die, i) => (
          <Die key={i} num={die} isGood />
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-3">
        {rollResult?.dangerDice.map((die, i) => (
          <Die key={i} num={die} isGood={false} />
        ))}
      </div>
      <div className="text-2xl mt-8">Result:</div>
      <div className="flex justify-center my-4">{rollResult && <Die num={rollResult.num} isGood />}</div>
      <div className="text-4xl">{rollResult?.text}</div>
    </div>
  )
}
