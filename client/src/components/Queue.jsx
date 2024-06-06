import React from 'react'
import close from "../assets/close.png";
import addToPlaylist from "../assets/addToPlaylist.png";

const Queue = ({queue,queuePointer,likedSongs,setShowQueue}) => {
  return (
    <div className="w-[50vw] h-[70vh] absolute  bg-cover bg-center my-[15vh]   mx-[25vw]" style={{ backgroundImage: `url(${queue[queuePointer].album.cover})` }}>
                <div className="backdrop-blur-lg overflow-auto w-full h-full p-4 flex flex-col gap-8">
                    <div className="h-fit flex justify-between items-center border-b-2 border-black">
                        <span className="mix-blend-darken text-black text-4xl font-semibold ">
                            My Queue
                        </span>
                        <button className="" onClick={()=>{setShowQueue(false)}}>
                            <img src={close} className=" w-[30px]" alt="" />
                        </button>
                    </div>
                    <div>
                        {queue.slice(queuePointer).map((element, index) => (
                            <li before={index + 1}
                                className={`w-[100%] hover:bg-primary justify-start px-4 py-2 flex items-center before:content-[attr(before)] hover:before:content-[url('https://firebasestorage.googleapis.com/v0/b/groovehub-c074d.appspot.com/o/images%2Fplay.svg?alt=media&token=9b90d9bd-49ee-48fc-b0db-e75e60c3a1c0')]`}
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
                                        <span>
                                            {element.plays}
                                        </span>
                                        <div>
                                            {likedSongs.includes(element._id) ?
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="#FF0000" />
                                                </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" fill="white" />
                                                </svg>
                                            }
                                        </div>
                                        <span>
                                            {element.duration}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>

                </div>

            </div>
  )
}

export default Queue