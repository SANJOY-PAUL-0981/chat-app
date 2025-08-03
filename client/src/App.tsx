import './App.css'
import { useState, useEffect, useRef } from 'react'
import { WebSocket } from "ws"

function App() {

  return (
    <>
      <div className='flex justify-center items-center h-dvh bg-black'>
        <div className='w-[40vw] h-[75vh] border border-[rgb(17,0,153)] bg-white/5 p-10 flex flex-col justify-between rounded shadow-[5px_5px_0px_0px_rgba(109,40,217)]'>
          <div>

          </div>

          <div className='flex gap-5'>
            <input type="text" className='border px-4 rounded w-full h-14 text-white' />
            <button className=' bg-white rounded px-8'>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
