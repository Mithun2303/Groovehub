import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './Dashboard';
import { Sample } from './Sample';
import { CookiesProvider, useCookies } from 'react-cookie'
import { Login } from './Login';
import Cookies from 'js-cookie';
import { Space } from './Space';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  function handleLogin() {
    setIsLoggedIn(true);
  }
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    removeCookie();
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queuePointer, setQueuePointer] = useState(0);
  
  const onNext = () => {
    if(queuePointer+1==queue.length){
      ;
    }
    else{
      setQueuePointer(queuePointer+1);
    }
  }
  const onPrevious = () =>{
    if(queuePointer===0){
      ;
    }
    else{
      setQueuePointer(queuePointer-1);
    }
  }
  const addQueue = (props) => {
    setQueue((prev)=>[...prev,props]);
  }
  const playNow = (props) => {
    setQueue((prev)=>[props]);
    setQueuePointer(0);
    console.log(queue,queuePointer);
  }
  const shufflePlay = () => {
    
      setQueuePointer(Math.floor(Math.random()* (queue.length))%queue.length);
      console.log(queuePointer)

  }
    return (
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
        <Route path='/space/:space_id' element={<Space/>}/>
        <Route path='/1' element={<Sample />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
