import dotenv from "dotenv"
import { WebSocketServer, WebSocket } from "ws"
dotenv.config()

const PORT: number = Number(process.env.PORT) || 8080

const wss = new WebSocketServer({ port: PORT })

interface User {
    socket: WebSocket,
    room: string
}

let allSocket: User[] = []

wss.on("connection", (socket) => { // socket argument is like req, res in express
    socket.on("message", (message) => {
        //@ts-ignore
        const parsedMessage = JSON.parse(message)

        if (parsedMessage.type === "join") {
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }

        if (parsedMessage.type === "chat") {
            // Find which room the sender is in
            const currentUserRoom = allSocket.find((x) => x.socket == socket)?.room

            if (currentUserRoom) {
                // Loop through all sockets in the same room
                allSocket.forEach((user) => {
                    if (user.room === currentUserRoom) {
                        // Send the message to each user in the room
                        user.socket.send(parsedMessage.payload.message);
                    }
                });
            }
        }
    })
})