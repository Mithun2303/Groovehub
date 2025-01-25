import { PopularArtistCard } from "./components/PopularArtistCard";
// import { TrendyAlbumCard } from "./TrendyAlbumCard";
// import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
export const Sample = () => {
    const [popularArtists, SetPopularArtists] = useState([]);
    // useEffect(() => {
    //     axios.get("http://54.163.212.62:8121/api/popular_artist").then((res) => {
    //         console.log(res.data);
    //         SetPopularArtists(res.data);
    //     });
    // }, [])
    useEffect(()=>{
        console.log(Cookies.get("username"));
    },[])
    return (
        <div className="flex gap-12 mt-5">
            handleLogin

            {/* {popularArtists.length != 0 
            &&
                popularArtists.forEach(element => (
                    <PopularArtistCard props={element} />
                ))
                // &&    <PopularArtistCard props={popularArtists[0]}/>

            } */}
            {/* <PopularArtistCard />
                // <PopularArtistCard />
                // <PopularArtistCard />
                // <PopularArtistCard /> */}
        </div>

        //         <main>
        //                 <audio src="https://dn720308.ca.archive.org/0/items/taylor-swift-collection/Taylor%20Swift%2FTaylor%20Swift%20-%20reputation%2F1%20...Ready%20For%20It-.mp3" autoPlay/>
        //         </main>
    )
}

