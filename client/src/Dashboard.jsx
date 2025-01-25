import { Sidebar } from "./components/Sidebar";
import { Sidebar2 } from "./components/Sidebar2";
import { Home } from "./components/Home";
import { useEffect, useState } from "react";
import { PopularArtist } from "./components/PopularArtist";
import { Album } from "./components/Album";
import { Playlist } from "./components/Playlist";
import { LikedSongs } from "./components/LikedSongs";
import axios from "axios";
import Queue from "./components/Queue";
import { ShowJoinSpace } from "./components/ShowJoinSpace";
export const Dashboard = ({ cookies,
    isLoggedIn,
    handleLogout,
    onNext,
    onPrevious,
    queuePointer,
    queue,
    addQueue,
    playNow,
    shufflePlay,
}) => {

    const [showJoinSpace,setShowJoinSpace] = useState(false);
    const [showQueue, setShowQueue] = useState(false);
    const [activeComponent, setActiveComponent] = useState(0);
    const [showMainPage, setShowMainPage] = useState(true);
    const [popularArtist, setPopularArtist] = useState(null);
    const [showPopularArtist, setShowPopularArtist] = useState(false);
    const [album, setAlbum] = useState(null);
    const [showAlbum, setShowAlbum] = useState(false);
    const [currentSong, setCurrentSong] = useState(null)
    const [showLikedSongs, setShowLikedSongs] = useState(false);
    const [likedSongs, setLikedSongs] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [showRecentlyPlayed, setShowRecentlyPlayed] = useState(false);
    const showHome = () => {
        setShowPopularArtist(false);
        setShowAlbum(false);
        setShowMainPage(true);
        setShowLikedSongs(false);
    }
    useEffect(() => {
        if (isLoggedIn==true) {
            console.log(isLoggedIn);
            axios.get("http://54.163.212.62:8121/api/user/likedsongs", { withCredentials: true })
                .then((res) => {
                    // console.log(res.data);
                    let ids = res.data.ids;
                    let songs = [];
                    ids.forEach(element => {
                        songs.push(element.song_id);
                    });
                    setLikedSongs(songs);
                    // console.log(songs);
                })
        };
        if (isLoggedIn)
            axios.get("http://54.163.212.62:8121/api/user/recentlyplayed/4", { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    setRecentlyPlayed(res.data);
                    setShowRecentlyPlayed(true);
                })
    }, [isLoggedIn]);

    // useEffect(() => {
    //     if (isLoggedIn && queue.length!=0) {
    //         console.log('queuePointer');
            
    //     }
    // }, [queuePointer,queue])


    return (
        <main className="bg-dark  w-screen h-screen flex justify-between">
            <Sidebar
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
                showHome={showHome}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                setShowJoinSpace={setShowJoinSpace}
            />
            {showMainPage && activeComponent == 0 ?
                <Home
                    setShowMainPage={setShowMainPage}
                    setShowAlbum={setShowAlbum}
                    setAlbum={setAlbum}
                    setPopularArtist={setPopularArtist}
                    setShowPopularArtist={setShowPopularArtist}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                    isLoggedIn={isLoggedIn}
                    setRecentlyPlayed={setRecentlyPlayed}
                    recentlyPlayed={recentlyPlayed}
                    showRecentlyPlayed={showRecentlyPlayed}
                    setShowRecentlyPlayed={setShowRecentlyPlayed}
                    addQueue={addQueue}
                    playNow={playNow}
                /> : activeComponent == 3 ?
                    <LikedSongs
                        setCurrentSong={setCurrentSong}
                        currentSong={currentSong}
                        isLoggedIn={isLoggedIn}
                        likedSongs={likedSongs}
                        setLikedSongs={setLikedSongs}
                        queue={queue}
                        onNext={onNext}
                        queuePointer={queuePointer}
                        onPrevious={onPrevious}
                        addQueue={addQueue}
                        playNow={playNow}
                    /> :
                    activeComponent == 4 ?
                        <Playlist
                            setCurrentSong={setCurrentSong}
                            currentSong={currentSong}
                            isLoggedIn={isLoggedIn}
                            likedSongs={likedSongs}
                            setLikedSongs={setLikedSongs}
                        /> : null
            }
            {
                showPopularArtist &&
                <PopularArtist
                    props={popularArtist}
                    isLoggedIn={isLoggedIn}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                    likedSongs={likedSongs}
                    setLikedSongs={setLikedSongs}
                    queue={queue}
                    onNext={onNext}
                    queuePointer={queuePointer}
                    onPrevious={onPrevious}
                    addQueue={addQueue}
                    playNow={playNow}
                />
            }
            {
                showAlbum &&
                <Album
                    props={album}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                    isLoggedIn={isLoggedIn}
                    likedSongs={likedSongs}
                    setLikedSongs={setLikedSongs}
                    queue={queue}
                    onNext={onNext}
                    queuePointer={queuePointer}
                    onPrevious={onPrevious}
                    addQueue={addQueue}
                    playNow={playNow}

                />
            }
            <Sidebar2 setCurrentSong={setCurrentSong}
                currentSong={currentSong}
                cookies={cookies}
                queue={queue}
                onNext={onNext}
                queuePointer={queuePointer}
                onPrevious={onPrevious}
                isLoggedIn={isLoggedIn}
                shufflePlay={shufflePlay}
                setShowQueue={setShowQueue}
            />
            {showQueue &&
                <Queue
                    queue={queue} 
                    queuePointer={queuePointer}
                    likedSongs={likedSongs}
                    setShowQueue={setShowQueue}
                    />}
            {
                showJoinSpace&& 
                <ShowJoinSpace setShowJoinSpace={setShowJoinSpace}/>
            }
        </main>
    )
}