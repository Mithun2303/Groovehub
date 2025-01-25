import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './Dashboard';
import { Sample } from './Sample';
import { CookiesProvider, useCookies } from 'react-cookie'
import { Login } from './Login';
import Cookies from 'js-cookie';
import { Space } from './Space';
import axios from 'axios';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["username"])
  function handleLogin(user) {
    setIsLoggedIn(true);
    setCookie('username', user, { path: '/' })
  }

  // useEffect(() => {
  //   window.addEventListener('load', handleLogin);
  //   return () => {
  //     window.removeEventListener('load', handleLogin);
  //   };
  // }, []);
  useEffect(() => {
    if (cookies.username) {
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    removeCookie("username");
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queuePointer, setQueuePointer] = useState(0);

  const onNext = () => {
    if (queuePointer + 1 == queue.length) {
      ;
    }
    else {
      setQueuePointer(queuePointer + 1);
      listen(queue[queuePointer])
    }
  }
  const onPrevious = () => {
    if (queuePointer === 0) {
      ;
    }
    else {
      setQueuePointer(queuePointer - 1);
      listen(queue[queuePointer])

    }
  }
  const addQueue = (props) => {
    setQueue((prev) => [...prev, props]);
  }
  const playNow = (props) => {
    setQueue((prev) => [props]);
    listen(props);
    setQueuePointer(0);
    console.log(queue, queuePointer);
  }
  const listen = (song) => {
    if (isLoggedIn) {
      axios.post("http://54.163.212.62:8121/api/user/listen", { song: song }, { withCredentials: true })
        .then((res) => {
          console.log(res);
        })
    }
  }
  const shufflePlay = () => {

    setQueuePointer(Math.floor(Math.random() * (queue.length)) % queue.length);
    console.log(queuePointer)

  }
  return (
    <CookiesProvider>

      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Dashboard
              cookies={cookies}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              onNext={onNext}
              onPrevious={onPrevious}
              queuePointer={queuePointer}
              queue={queue}
              addQueue={addQueue}
              playNow={playNow}
              shufflePlay={shufflePlay}

            />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path='/space/:space_id' element={<Space />} />
          <Route path='/1' element={<Sample />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
