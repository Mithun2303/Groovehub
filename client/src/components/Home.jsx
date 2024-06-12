import { PopularArtistCard } from "./PopularArtistCard";
import { TrendyAlbumCard } from "./TrendyAlbumCard";
import { RecentlyPlayed } from "./RecentlyPlayed";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";


export const Home = ({ setShowMainPage,
    setPopularArtist,
    setShowPopularArtist,
    setCurrentSong,
    currentSong,
    setShowAlbum,
    setAlbum,
    isLoggedIn,
    recentlyPlayed,
    showRecentlyPlayed,
    setShowRecentlyPlayed,
    setRecentlyPlayed,
    addQueue,
    playNow,
}) => {
    const [popularArtists, setPopularArtists] = useState([]);
    const [trendyAlbum, setTrendyAlbum] = useState([]);
    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/popular_artist").then((res) => {
            // console.log(res.data);
            setPopularArtists(res.data);
        });
        axios.get("http://127.0.0.1:8000/api/trendy_album").then((res) => {
            // console.log(res.data);
            setTrendyAlbum(res.data);
        });



    }, []);
   

    return (
        <main className="customScroller w-[58.34vw] ml-[16.66vw] overflow-x-hidden p-4 text-white">
            <Navbar />

            <section className="mt-4 mx-[5%]">
                <div className="flex justify-between ">
                    <span className="text-lg font-semibold">
                        Popular Artists
                    </span>
                    <span className="text-sm font-extralight text-[#D4BABA] hover:underline">
                        View all&gt;
                    </span>
                </div>
                <div className="flex gap-11 mt-5 overflow-hidden">
                    {popularArtists.length != 0 &&
                        popularArtists.map(element => (
                            <PopularArtistCard
                                props={element}
                                setShowMainPage={setShowMainPage}
                                setPopularArtist={setPopularArtist}
                                setShowPopularArtist={setShowPopularArtist}
                            />
                        ))
                        // {/* <PopularArtistCard />
                        // <PopularArtistCard />
                        // <PopularArtistCard />
                        // <PopularArtistCard />
                        // <PopularArtistCard /> */}
                    }
                </div>
            </section>
            <section className="mt-5 mx-[5%]">
                <div className="flex justify-between ">
                    <span className="text-lg font-semibold">
                        Trendy albums
                    </span>
                    <span className="text-sm font-extralight text-[#D4BABA] hover:underline">
                        View all&gt;
                    </span>
                </div>
                <div className="flex gap-10 mt-5 overflow-hidden">
                    {trendyAlbum.length != 0 &&
                        trendyAlbum.map(element => (
                            <TrendyAlbumCard
                                props={element}
                                setShowMainPage={setShowMainPage}
                                setShowAlbum={setShowAlbum}
                                setAlbum={setAlbum} />
                        ))}
                    {/* {trendyAlbum.length != 0 &&
                        trendyAlbum.map(element => (
                            <TrendyAlbumCard props={element} />
                        ))} */}
                    {/* <TrendyAlbumCard />
                    <TrendyAlbumCard />
                    <TrendyAlbumCard /> */}
                </div>
            </section>
            {recentlyPlayed.length != 0 &&
                <RecentlyPlayed
                    props={recentlyPlayed}
                    addQueue={addQueue}
                    playNow={playNow}

                />}
        </main>
    )
}