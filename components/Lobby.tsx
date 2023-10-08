import { useRouter } from "next/router"
import { useState } from "react"
import { getRoomName } from "../helpers"
import Footer from "./Footer"

export default function Lobby() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState("")
  const [error, setError] = useState<string>("")

  async function handleJoin(e) {
    e.preventDefault()

    let room = router.query.room

    if (room) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/player?playerName=${playerName}&room=${room}`)
        const result = await res.json()
        if (result.exists) {
          throw new Error("There is already a player with this name in the room.")
        }
      } catch (err: any) {
        return setError(err.message)
      }
    } else {
      room = getRoomName()
    }
    router.push(`/room/${room}?playerName=${playerName}`, `/room/${room}`)
  }

  return (
    <>
      <form
        onSubmit={handleJoin}
        className="h-screen p-4 flex flex-col justify-center items-center text-2xl sm:text-3xl gap-3"
      >
        <input
          placeholder="Enter your name"
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full sm:w-auto text-green p-4 bg-transparent border-2 border-pink rounded-full text-center placeholder:text-pink placeholder:opacity-60"
        />
        {error && <div className="text-red text-lg">{error}</div>}
        <button
          disabled={!playerName}
          className="w-full sm:w-auto bg-pink text-blue hover:bg-lightpink rounded-full p-4 disabled:opacity-60 disabled:hover:bg-pink"
        >
          Join game
        </button>
      </form>
      <Footer />
    </>
  )
}
