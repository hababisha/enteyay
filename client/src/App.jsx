import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Lobby from './pages/Lobby'
import RoomPage from './pages/Room'
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path = '/' element = {<Lobby/>}/>
        <Route path = '/room/:roomId' element = {<RoomPage/>}/>

      </Routes>
    </div>
  )
}

export default App