import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Sidebar2 } from './components/Sidebar2';
import io from "socket.io-client";
import axios from 'axios';

export const Space = () => {
  const socket = io.connect("http://54.163.212.62:8121");
  const { space_id } = useParams()
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const username = localStorage.getItem("username");
  const [profile, setProfile] = useState("");
  const audioRef = useRef();
  const [currentSong, setCurrentSong] = useState();

  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);


  useEffect(() => {
    console.log("INSIDE EFFECT")
    axios.get(`http://54.163.212.62:8121/api/user/profile/${username}`).then((res) => {
      console.log(res.data);
      setProfile(res.data.profile);
    })
  }, [])

  useEffect(() => {
    if (profile.length != 0) {
      setMessage((prev) => [...prev, { from:username,space_id: space_id, username: username, dp: profile,message:`${username} has joineed the space`}])
      socket.emit("join_space", { space_id: space_id, username: username, dp: profile })
    
    }
  }, [profile]);

  // useEffect(() => {
  //   console.log(message);
  // }, [message]);
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data.message);
      setMessage((prev) => [...prev, data]);
    });
  }, [socket])

  useEffect(() => {
    socket.on("play", (data) => {
      setMessage((prev) => [...prev, data]);
      console.log(data.message);
      audioRef.current.src = data.link;
      audioRef.current.play();
      setCurrentSong(data.song);
    });
  }, [socket])

  useEffect(() => {
    socket.on("pause", (data) => {
      setMessage((prev) => [...prev, data]);
      console.log(data.message);
      audioRef.current.pause();
      setCurrentSong(data.song);
    });
  }, [socket])

  const sendMessage = () => {
    if (input.length != 0) {
      if (input.match(/\\pause/)) {
        console.log("pause")
        socket.emit("send_message", { space_id: space_id, message: input, from: username, dp: profile, song: currentSong });
      }
      else if (input.match(/\\play$/)) {
        console.log("resume")
        socket.emit("send_message", { space_id: space_id, message: input, from: username, dp: profile, song: currentSong });
      }
      else if (input.match(/\\play.*/)) {
        console.log("play ",input)
        socket.emit("send_message", { space_id: space_id, message: input, from: username, dp: profile });
      }
      else {
        console.log("others");
        socket.emit("send_message", { space_id: space_id, message: input, from: username, dp: profile });
      }
    }
  }
  return (
    <main className='flex'>
      <Sidebar />
      <div className='bg-[rgb(23,22,22,0.9)] h-screen w-[84.44vw] ml-[16.66%] flex flex-col-reverse p-8 gap-5 '>
        <form className='w-full flex' onSubmit={(e) => { e.preventDefault(); sendMessage(); e.target[0].value = "" }}>
          <input type="text"
            placeholder='Send a Message'
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className='p-3 bg-[rgb(23,22,22,0.9)] w-[90%] rounded-l-2xl rounded-y-2xl outline-none text-white border-y-2 border-l-2 border-primary' />
          <button type="submit"
            // onClick={sendMessage}
            className='p-3 bg-primary w-[10%] rounded-r-2xl text-black border-y-2 border-r-2 border-primary'>Send</button>
        </form>
        <ul className='flex flex-col gap-5 overflow-auto scroll-auto'>
          {message.map((element, index) => (
            <li className='text-white px-3 text-md font-medium' key={index}>
              <div className='flex items-center gap-2'>
                <img src={element.dp} className="w-[40px] rounded-[40px] bg-black" alt="" />
                <span className='text-sm text-gray-500'>
                  {element.from == username ? "You" : element.from}
                </span>
              </div>
              <div className='px-4'>
                {element.message}
              </div>
            </li>
          ))}
          <div ref={bottomRef} />
        </ul>
        <audio ref={audioRef}  ></audio>

      </div>

    </main>
  )
}
