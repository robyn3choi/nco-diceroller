import { useRouter } from "next/router"
import { useState } from "react"

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState("")

  return (
    <div className="h-screen flex flex-col justify-center items-center text-3xl gap-3">
      {/* <div className="">Enter your name:</div> */}
      <input
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        className="text-green p-4 bg-transparent border-2 border-pink rounded-full text-center placeholder:text-pink placeholder:opacity-60"
      />
      <button
        onClick={() => router.push({ pathname: "dice", query: { name } })}
        disabled={!name}
        className="bg-pink text-blue hover:bg-lightpink rounded-full p-4 text-3xl disabled:opacity-60 disabled:hover:bg-pink"
      >
        Join game
      </button>
    </div>
  )
}
