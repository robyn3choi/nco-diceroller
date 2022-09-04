import io from "socket.io-client"
import { useEffect, useState } from "react"

let socket

export default function Home() {
  const [rollResult, setRollResult] = useState()

  useEffect(() => {
    async function initSocket() {
      await fetch("/api/socket")
      socket = io()

      socket.on("connect", () => {
        console.log("connected")
      })
      socket.on("rolled", (msg) => {
        setRollResult(msg)
      })
    }
    initSocket()
  }, [])

  function roll() {
    console.log("roll")
    socket.emit("roll", 2)
  }

  return (
    <div>
      <button onClick={roll}>Roll</button>
      <div>{rollResult}</div>
    </div>
  )
}
