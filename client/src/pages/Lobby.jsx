import React, {useState, useCallback, useEffect} from 'react'
import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom';

function Lobby() {
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');

    const socket = useSocket();
    const navigate = useNavigate();

    console.log(socket);

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', {email, room})
    }, [email, room, socket])

    const handleJoinRoom = useCallback((data) => {
        const {email, room} = data;
        navigate(`/room/${room}`)
    }, [navigate])
    useEffect(() => {
        socket.on('room:join', handleJoinRoom);
        return () => {
            socket.off('room:join', handleJoinRoom);
        }
    }, [socket, handleJoinRoom])
  return (
    <div className='flex flex-col mt-12 justify-center items-center'>
        <h3 className='text-3xl'>Lobby</h3>
        <form onSubmit={handleSubmitForm} className='flex flex-col'>
            <label htmlFor='email' >Email ID: </label>
            <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'/>
            <br />
            <label htmlFor='room'>Room Number:  </label>
            <input type="text" id='room' value={room} onChange={(e) => setRoom(e.target.value)} className='border border-gray-300 bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'/>
            <br />
            <button className='bg-blue-900 text-white hover:cursor-pointer hover:bg-blue-700'>Join</button>
        </form>
    </div>
  )
}

export default Lobby