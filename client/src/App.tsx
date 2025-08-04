import './App.css'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [messages, setMessages] = useState(["hi there", "hii"])
  const [inputChat, setInputChat] = useState("")
  const wsRef = useRef()

  const handleSend = () => {
    wsRef.current.send(JSON.stringify({
      type: "chat",
      payload: {
        message: inputChat
      }
    }))
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")

    ws.onmessage = (e) => {
      setMessages(m => [...m, e.data]) //...m means all the messages(all the previous elements) and the new messages
    }

    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }
  }, [])

  return (
    <>
      <div className='flex justify-center items-center h-dvh bg-black'>
        <div className='w-[40vw] h-[75vh] border border-[rgb(66,0,153)] bg-white/5 p-10 flex flex-col justify-between rounded shadow-[5px_5px_0px_0px_rgba(109,40,217)]'>
          <div className='border border-[rgb(66,0,153)] h-[85%] rounded'>
            {messages.map(message => <div className='bg-white/15 w-fit p-2 rounded-lg m-8 text-white'>{message}</div>)}
          </div>

          <div className='flex gap-5'>
            <input
              type="text"
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
              className='border px-4 rounded w-full h-14 text-white' />

            <button
              onClick={handleSend}
              className=' bg-white rounded px-8'>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
