import React, { useEffect, useCallback, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSocket } from '../context/SocketProvider';

const RoomPage = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();

    const handleUserJoined = useCallback(({email, id}) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id)
    }, [])

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true});

        setMyStream(stream)
    }, [])

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);

        return () => {
            socket.off('user:joined', handleUserJoined)
        }

    }, [socket, handleUserJoined])
    return (
        <div className='w-full h-screen flex justify-center flex-col items-center'>
            <h1 className='text-4xl font-bold  mt-2'>Room Page</h1>
            <h4 className='flex justify-center pt-6 text-2xl'>{ remoteSocketId ? 'connected' : 'No one in room'}</h4>
             {remoteSocketId && <button className='bg-blue-800 mt-6 text-white p-2 rounded-md ' onClick={handleCallUser}>CALL</button> }   
             {myStream &&<> <h1>myself</h1> <ReactPlayer playing muted height="300px" width="500px" url={myStream} /></>}
        </div>
    )
}

export default RoomPage;