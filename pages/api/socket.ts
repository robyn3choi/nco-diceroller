import { Server } from "socket.io"

const players: any[] = []

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      socket.on("roll", ({ actionDiceCount, dangerDiceCount }) => {
        const actionDice: number[] = []
        const dangerDice: number[] = []

        for (let i = 0; i < actionDiceCount; i++) {
          actionDice.push(Math.floor(Math.random() * 6 + 1))
        }
        for (let i = 0; i < dangerDiceCount; i++) {
          dangerDice.push(Math.floor(Math.random() * 6 + 1))
        }
        const player = players.find((p) => p.id === socket.id)

        io.emit("rolled", { actionDice, dangerDice, name: player.name })
      })

      socket.on("playerJoined", (name) => {
        console.log("joined")
        players.push({ name, id: socket.id })
        io.emit("playersUpdated", players)
      })

      socket.on("disconnect", () => {
        console.log("left")
        const index = players.findIndex((p) => p.id === socket.id)
        if (index > -1) {
          players.splice(index, 1)
        }
        console.log(players)
        io.emit("playersUpdated", players)
      })
    })
  }
  res.end()
}
