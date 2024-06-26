import { Link } from "react-router-dom";
import { FriendCard } from "./FriendCard";
import { MusicCard } from "./MusicCard";
export const Sidebar2 = ({ setCurrentSong, currentSong, cookies, isLoggedIn, queuePointer, onNext, onPrevious, queue,addQueue,playNow,shufflePlay,setShowQueue }) => {
    return (
        <main className="h-screen fixed left-[75vw] bg-dark w-[25%] shadow-lg flex flex-col-reverse  justify-between gap-2 py-4">
            <div className=" flex justify-end w-[80%] mx-[10%]">
                <MusicCard 
                    onNext={onNext}
                    onPrevious={onPrevious}
                    queuePointer={queuePointer}
                    queue={queue} 
                    addQueue={addQueue}
                    playNow={playNow}
                    shufflePlay={shufflePlay}
                    setShowQueue={setShowQueue}
                    />
            </div>
            {isLoggedIn ?
                <div className="flex flex-col items-center justify-between gap-2 py-4">
                    <div className="flex justify-between w-[80%] mx-[10%]">
                        <div className="flex text-white flex-col">
                            <span className="text-lg font-semibold">
                                Friends Activity
                            </span>
                            <span className="text-sm font-extralight">
                                150 friends
                            </span>
                        </div>
                        <div className="bg-black rounded-[50%] w-[50px] h-[50px] p-2 flex justify-center items-center">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 17.5C16.7262 17.5 18.2887 16.8 19.42 15.6687C20.55 14.5387 21.25 12.9763 21.25 11.25C21.25 9.52375 20.55 7.96125 19.42 6.83125C18.2887 5.7 16.7262 5 15 5C13.2738 5 11.7112 5.7 10.58 6.83125C9.45 7.96125 8.75 9.52375 8.75 11.25C8.75 12.9763 9.45 14.5387 10.58 15.6687C11.1598 16.2501 11.8487 16.7112 12.6072 17.0255C13.3658 17.3398 14.1789 17.501 15 17.5ZM25 18.75C25.4106 18.7508 25.8173 18.6706 26.1969 18.5138C26.5764 18.357 26.9212 18.1269 27.2115 17.8365C27.5019 17.5462 27.732 17.2014 27.8888 16.8219C28.0456 16.4423 28.1258 16.0356 28.125 15.625C28.125 14.7625 27.7762 13.9813 27.21 13.415C26.9201 13.1244 26.5756 12.8939 26.1963 12.7369C25.8171 12.5799 25.4105 12.4994 25 12.5C24.5894 12.4992 24.1827 12.5794 23.8031 12.7362C23.4236 12.893 23.0788 13.1231 22.7885 13.4135C22.4981 13.7038 22.268 14.0486 22.1112 14.4281C21.9544 14.8077 21.8742 15.2144 21.875 15.625C21.8743 16.0356 21.9547 16.4422 22.1115 16.8217C22.2683 17.2011 22.4985 17.5459 22.7888 17.8362C23.0791 18.1265 23.4239 18.3567 23.8033 18.5135C24.1828 18.6703 24.5894 18.7507 25 18.75ZM25 19.4875C23.3363 19.4875 22.085 19.995 21.3538 20.6975C19.96 19.5513 17.7563 18.75 15 18.75C12.1675 18.75 10.0063 19.56 8.635 20.705C7.89 19.9987 6.625 19.4875 5 19.4875C2.265 19.4875 0.625 20.85 0.625 22.215C0.625 22.8962 2.265 23.58 5 23.58C5.755 23.58 6.4325 23.5163 7.02875 23.4138L6.97875 23.7512C6.97875 25.0012 9.98625 26.2512 15 26.2512C19.7025 26.2512 23.0212 25.0012 23.0212 23.7512L22.9963 23.4325C23.575 23.5238 24.24 23.58 25 23.58C27.5637 23.58 29.375 22.8962 29.375 22.215C29.375 20.85 27.6588 19.4875 25 19.4875ZM5 18.75C5.8625 18.75 6.64375 18.4012 7.21 17.835C7.50061 17.5451 7.73105 17.2006 7.88808 16.8213C8.04511 16.4421 8.12562 16.0355 8.125 15.625C8.12582 15.2144 8.04556 14.8077 7.8888 14.4281C7.73205 14.0486 7.50189 13.7038 7.21155 13.4135C6.9212 13.1231 6.57637 12.893 6.19686 12.7362C5.81735 12.5794 5.41061 12.4992 5 12.5C4.58943 12.4993 4.18278 12.5797 3.80334 12.7365C3.4239 12.8933 3.07914 13.1235 2.78882 13.4138C2.49851 13.7041 2.26835 14.0489 2.11154 14.4283C1.95472 14.8078 1.87434 15.2144 1.875 15.625C1.87418 16.0356 1.95444 16.4423 2.1112 16.8219C2.26795 17.2014 2.49811 17.5462 2.78845 17.8365C3.0788 18.1269 3.42363 18.357 3.80314 18.5138C4.18265 18.6706 4.58939 18.7508 5 18.75Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-left w-[80%] mx-[10%] text-white font-extralight text-sm">
                        <span>
                            See What songs your friends and
                            followers are listening to.
                        </span>
                    </div>
                    <div className="w-[80%] mx-[10%] flex flex-col gap-4">
                        <FriendCard />
                        <FriendCard />
                        <FriendCard />
                    </div>
                    <div className=" flex justify-end w-[80%] mx-[10%]">
                        <span className="text-sm font-extralight text-white">
                            See 10 others
                        </span>
                    </div>
                </div> : <div className="flex flex-col gap-2 px-8 py-4">
                    <div>
                        <span className="text-left text-2xl font-bold text-white">
                            <span className="text-primary">
                                Login
                            </span> To Explore More
                        </span>
                    </div>
                    <div>
                        <span className="text-xl font-semibold text-white">
                            Benefits of <span className="text-primary">
                                Logging In:
                            </span>
                        </span>
                    </div>
                    <div className="gap-2 flex flex-col">
                        <li className="text-sm font-light text-white">
                            <span className="font-semibold">
                                Personalized Experience:
                            </span>
                            Logging in allows GrooveHub to tailor the experience to you.
                        </li>
                        <li className="text-sm font-light text-white">
                            <span className="font-semibold">
                                Syncing Across Devices:
                            </span>
                            By logging in, you can sync your preferences, playlists, and listening history across multiple devices.
                        </li>
                        <li className="text-sm font-light text-white">
                            <span className="font-semibold">
                                Syncing Across Devices:
                            </span>
                            By logging in, you can sync your preferences, playlists, and listening history across multiple devices.                        </li>
                    </div>
                    <Link to="/login" className="w-full h-12 flex items-center justify-center rounded-xl bg-primary mt-5 text-2xl font-bold text-white">
                        Login / Signup
                    </Link>
                </div>
            }
        </main>
    )
}