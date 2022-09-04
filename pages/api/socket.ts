import { Server } from "Socket.IO"

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log("connected")

      socket.on("roll", ({ actionDiceCount, dangerDiceCount }) => {
        const actionDice: number[] = []
        const dangerDice: number[] = []

        for (let i = 0; i < actionDiceCount; i++) {
          actionDice.push(Math.floor(Math.random() * 6 + 1))
        }
        for (let i = 0; i < dangerDiceCount; i++) {
          dangerDice.push(Math.floor(Math.random() * 6 + 1))
        }

        io.emit("rolled", { actionDice, dangerDice })
      })
    })
  }
  res.end()
}
