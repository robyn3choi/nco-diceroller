import { io } from "socket.io-client"
import { useEffect, useState } from "react"
import DiceNumberSelect from "../../components/DiceNumberSelect"
import Die from "../../components/Die"
import { useRouter } from "next/router"
import Lobby from "../../components/Lobby"
import Footer from "../../components/Footer"

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, { autoConnect: false })

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
  const [players, setPlayers] = useState<string[]>([])
  const [actionDiceCount, setActionDiceCount] = useState(1)
  const [dangerDiceCount, setDangerDiceCount] = useState(0)
  const [rollResult, setRollResult] = useState<RollResult>()

  const { room, playerName } = router.query

  useEffect(() => {
    async function initSocket() {
      console.log("init", socket)

      socket.connect()

      socket.on("connect", () => {
        console.log("joining")
        socket.emit("playerJoined", { playerName, room })
      })

      socket.on("playersUpdated", (updatedPlayers) => {
        setPlayers(updatedPlayers)
      })

      socket.on("rolled", ({ actionDice, dangerDice, playerName }) => {
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
        const result = { actionDice, dangerDice, num, text, id: Date.now(), playerName }
        setRollResult(result)
      })
    }
    if (playerName) {
      initSocket()
    }
    return () => {
      if (socket) {
        socket.emit("playerLeft", playerName)
      }
    }
  }, [playerName, room])

  if (!playerName) return <Lobby />

  function reset() {
    setDangerDiceCount(0)
    setActionDiceCount(1)
  }

  function roll() {
    socket.emit("roll", { room, playerName, actionDiceCount, dangerDiceCount })
  }

  return (
    <>
      <div className="text-center p-4 sm:p-8">
        <h1 className="text-4xl mb-4 mt-8">Neon City Overdrive</h1>
        <div className="text-sm font-sans">To invite players to join this room, send them this page’s URL.</div>
        <div className="absolute top-4 text-lg text-green">
          {players.map((player) => (
            <div key={player}>{player}</div>
          ))}
        </div>
        <div className="hidden sm:flex gap-8 justify-center items-center mt-10 mb-6">
          <DiceNumberSelect label="Action dice" value={actionDiceCount} isGood onChange={setActionDiceCount} />
          <button onClick={reset} className="border-2 border-pink hover:border-white hover:text-white p-3 text-lg">
            Reset
          </button>
          <DiceNumberSelect label="Danger dice" value={dangerDiceCount} isGood={false} onChange={setDangerDiceCount} />
        </div>
        <div className="flex flex-col sm:hidden gap-4 justify-center items-center mt-10 mb-6">
          <DiceNumberSelect label="Action dice" value={actionDiceCount} isGood onChange={setActionDiceCount} />
          <DiceNumberSelect label="Danger dice" value={dangerDiceCount} isGood={false} onChange={setDangerDiceCount} />
          <button
            onClick={reset}
            className="mb-2 border-2 border-pink hover:border-white hover:text-white p-3 sm:text-lg"
          >
            Reset
          </button>
        </div>
        <button
          onClick={roll}
          className="border-2 border-green text-green hover:border-white hover:text-white rounded-full text-2xl h-28 w-28"
        >
          Roll
        </button>
        {rollResult && (
          <div className="text-2xl mt-6 mb-4">
            <span className="text-green">{rollResult.playerName} </span>rolled:
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
      <Footer />
    </>
  )
}
