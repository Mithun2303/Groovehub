import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import axios from "axios";

export const Playlist = ({ setCurrentSong, currentSong, isLoggedIn, likedSongs, setLikedSongs }) => {
    
    return (
        <main className="w-[61.34vw] ml-[15.66vw] overflow-x-hidden p-4  text-white">
            <Navbar />
            <section className="w-full h-48 bg-cover bg-center bg-[#2c2a2a]  mt-6 flex items-center gap-12 px-8">
                <div className="">
                    <span className=" text-7xl  flex flex-wrap font-extrabold w-[500px]  line-clamp-1 text-white mix-blend-soften">
                        My Playlists
                    </span>
                </div>
            </section>
            <section className="mx-16 mt-6 flex gap-12 items-center">
                <div>
                    
                </div>
                
            </section>
            <section className="mt-12  mx-16">
                
            </section>
        </main >
    )
}