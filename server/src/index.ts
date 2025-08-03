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
        const parsedMessage = JSON.parse(message) // data sent over WebSocket is actually JSON string thats why we have to parse it in Obj
        if(parsedMessage.type === "join"){
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
    })

    socket.on("disconnected", () => {
        allSocket = allSocket.filter(x => x != socket)
    })
})