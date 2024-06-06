import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import addToPlaylist from "../assets/addToPlaylist.png";
import axios from "axios";

export const LikedSongs = ({ setCurrentSong,
    currentSong,
    isLoggedIn,
    likedSongs,
    setLikedSongs,
    addQueue,
    playNow }) => {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        if (likedSongs != null) {
            axios.post("http://127.0.0.1:8000/api/user/song", { likedSongs: likedSongs })
                .then((res) => {
                    setSongs(res.data);
                    console.log(res.data);
                })
        }
    }, [])
    const handleClick = async (e, element) => {
        e.preventDefault();
        e.preventDefault();
        console.log(likedSongs.includes(element._id))
        if (likedSongs.includes(element._id)) {
            if (isLoggedIn) {
                setLikedSongs((el) => { return el.filter(val => val != element._id) });
                await axios.post("http://127.0.0.1:8000/api/user/unlike", { song: element }, { withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                    })
            }
        }
        else {
            console.log(element.title);
            if (isLoggedIn) {
                setLikedSongs((el) => [...el, element._id]);
                console.log("bello");
                await axios.post("http://127.0.0.1:8000/api/user/like", { song: element }, { withCredentials: true })
                    .then((res) => {
                        console.log(res);
                    })
            }
        }
    }
    return (
        <main className="w-[61.34vw] ml-[15.66vw] overflow-x-hidden p-4  text-white">
            <Navbar />
            <section className="w-full h-48 bg-cover bg-center bg-[#2c2a2a]  mt-6 flex items-center gap-12 px-8">
                <div className="">
                    <span className=" text-7xl  flex flex-wrap font-extrabold w-[500px]  line-clamp-1 text-white mix-blend-soften">
                        Liked Songs

                    </span>
                </div>
            </section>
            <section className="mx-16 mt-6 flex gap-12 items-center">
                <div>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 0.166656C9.49999 0.166656 0.166656 9.49999 0.166656 21C0.166656 32.5 9.49999 41.8333 21 41.8333C32.5 41.8333 41.8333 32.5 41.8333 21C41.8333 9.49999 32.5 0.166656 21 0.166656ZM16.8333 28.2917V13.7083C16.8333 13.5149 16.8872 13.3252 16.9889 13.1607C17.0906 12.9961 17.2361 12.8631 17.4091 12.7766C17.5822 12.6901 17.7759 12.6535 17.9685 12.6709C18.1612 12.6882 18.3452 12.7589 18.5 12.875L28.2292 20.1667C28.7917 20.5833 28.7917 21.4167 28.2292 21.8333L18.5 29.125C18.3452 29.2411 18.1612 29.3117 17.9685 29.3291C17.7759 29.3465 17.5822 29.3099 17.4091 29.2234C17.2361 29.1368 17.0906 29.0039 16.9889 28.8393C16.8872 28.6747 16.8333 28.4851 16.8333 28.2917Z" fill="url(#paint0_linear_2_414)" />
                        <defs>
                            <linearGradient id="paint0_linear_2_414" x1="21" y1="0.166656" x2="21" y2="41.8333" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#76ABAE" />
                                <stop offset="1" stop-color="#76ABAE" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

            </section>
            <section className="mt-12  mx-16">
                <ul className="">
                    {songs.map((element, index) => (
                        <li before={index + 1}
                            className={`w-[100%] hover:bg-[#2c2a2a] justify-start px-4 py-2 flex items-center before:content-[attr(before)] hover:before:content-[url('https://firebasestorage.googleapis.com/v0/b/groovehub-c074d.appspot.com/o/images%2Fplay.svg?alt=media&token=9b90d9bd-49ee-48fc-b0db-e75e60c3a1c0')]`}
                            
                        >
                            <div className="w-full flex items-center ">
                                <div className=" w-[80%] flex gap-4 items-center" onClick={(e) => {
                                e.preventDefault();
                                // setCurrentSong(element);
                                playNow(element);
                            }}>
                                    <img className="w-16 mx-4" src={element.album.cover} alt="" />
                                    {element.title}
                                </div>
                                <div className="flex  items-center gap-4 font-extralight">

                                    <button type="button" onClick={
                                        (e)=>{
                                            e.preventDefault;
                                            addQueue(element);
                                        }
                                    }>
                                        <img src={addToPlaylist} alt="" />
                                    </button>
                                    <span>
                                        {element.plays}
                                    </span>
                                    <button onClick={(e) => { handleClick(e, element) }}>
                                        {likedSongs.includes(element._id) ?
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#FF0000" />
                                            </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" fill="white" />
                                            </svg>
                                        }
                                    </button>
                                    <span>
                                        {element.duration}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main >
    )
}