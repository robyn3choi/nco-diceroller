import { Server } from "Socket.IO"

let count = 0

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
      console.log("connected")
      io.emit("rolled", count)

      socket.on("roll", (msg) => {
        console.log(msg)
        count += msg
        io.emit("rolled", count)
      })
    })
  }
  res.end()
}
