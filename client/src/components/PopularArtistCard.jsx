export const PopularArtistCard = ({props,setPopularArtist,setShowMainPage,setShowPopularArtist}) => {
    return(
        <button className="flex flex-col items-center" onClick={(e)=>{e.preventDefault();setPopularArtist(props);setShowMainPage(false);setShowPopularArtist(true);}}>
            <img  className="min-h-[82px] min-w-[82px] max-w-[82px] max-h-[82px] rounded-[82px]" src={props.cover} alt={props.name} />
            <span className="text-sm font-light text-white mt-2 max-w-[80px] text-center truncate">
                {props.name}
            </span>
        </button>
    )
}