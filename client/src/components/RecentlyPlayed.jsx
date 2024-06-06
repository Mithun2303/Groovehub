import { useEffect } from "react"

export const RecentlyPlayed = ({ props, addQueue,playNow }) => {
    useEffect(() => {
        console.log(props[0].album.cover);
    }, [])
    return (
        <section className="mt-5 mx-[5%]">
            <div className="flex justify-between ">
                <span className="text-lg font-semibold">
                    Recently Played
                </span>
                <span className="text-sm font-extralight text-[#D4BABA] hover:underline">
                    View all&gt;
                </span>
            </div>
            <div className="flex gap-12">
                <div className={`flex flex-col-reverse w-[199px] h-[197px] bg-cover bg-center  rounded-2xl`} style={{ backgroundImage: `url(${props[0].album.cover})` }}>
                    <div className="flex justify-between backdrop-blur-xl p-2 rounded-b-2xl">
                        <div className="flex flex-col">
                            <span className="text-md font-semibold">
                                {props[0].title}
                            </span>
                            <span className="text-sm font-light">
                                {props[0].artists[0].name}
                            </span>
                        </div>
                        <button onClick={(e) => { e.preventDefault(); playNow(props[0]) }}>

                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 0.166656C9.49999 0.166656 0.166656 9.49999 0.166656 21C0.166656 32.5 9.49999 41.8333 21 41.8333C32.5 41.8333 41.8333 32.5 41.8333 21C41.8333 9.49999 32.5 0.166656 21 0.166656ZM16.8333 28.2917V13.7083C16.8333 13.5149 16.8872 13.3252 16.9889 13.1607C17.0906 12.9961 17.2361 12.8631 17.4091 12.7766C17.5822 12.6901 17.7759 12.6535 17.9685 12.6709C18.1612 12.6882 18.3452 12.7589 18.5 12.875L28.2292 20.1667C28.7917 20.5833 28.7917 21.4167 28.2292 21.8333L18.5 29.125C18.3452 29.2411 18.1612 29.3117 17.9685 29.3291C17.7759 29.3465 17.5822 29.3099 17.4091 29.2234C17.2361 29.1368 17.0906 29.0039 16.9889 28.8393C16.8872 28.6747 16.8333 28.4851 16.8333 28.2917Z" fill="url(#paint0_linear_2_414)" />
                                <defs>
                                    <linearGradient id="paint0_linear_2_414" x1="21" y1="0.166656" x2="21" y2="41.8333" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#76ABAE" />
                                        <stop offset="1" stop-color="#76ABAE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">

                    <div className="flex h-[80px] w-fit bg-black rounded-l-[80px] rounded-r-[50px] gap-4">
                        <div>
                            <img className="w-[80px] h-[80px] rounded-[80px]" src={props[1].album.cover} alt="" />
                        </div>
                        <div className="flex w-24 truncate ellipsis flex-col justify-center ">
                            <span className="text-md">
                                {props[1].title}
                            </span>
                            <span className="text-sm">
                                {props[1].artists[0].name}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <svg width="182" height="26" viewBox="0 0 182 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1.5" y1="6" x2="1.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="97.5" y1="6" x2="97.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="38.5" y1="4" x2="38.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="134.5" y1="4" x2="134.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="74.5" y1="4" x2="74.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="171.5" y1="4" x2="171.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="6.5" y1="6" x2="6.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="102.5" y1="6" x2="102.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="42.5" y1="5.46392e-08" x2="42.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="139.5" y1="5.46392e-08" x2="139.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="79.5" y1="6" x2="79.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="175.5" y1="6" x2="175.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="10.5" y1="4" x2="10.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="106.5" y1="4" x2="106.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="47.5" y1="4" x2="47.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="143.5" y1="4" x2="143.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="84.5" y1="6" x2="84.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="180.5" y1="6" x2="180.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="15.5" y1="5.46392e-08" x2="15.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="111.5" y1="5.46392e-08" x2="111.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="51.5" y1="6" x2="51.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="148.5" y1="6" x2="148.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="88.5" y1="6" x2="88.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="19.5" y1="4" x2="19.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="116.5" y1="4" x2="116.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="56.5" y1="6" x2="56.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="152.5" y1="6" x2="152.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="93.5" y1="5.46392e-08" x2="93.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="24.5" y1="6" x2="24.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="120.5" y1="6" x2="120.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="61.5" y1="6" x2="61.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="157.5" y1="6" x2="157.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="29.5" y1="6" x2="29.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="125.5" y1="6" x2="125.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="65.5" y1="4" x2="65.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="161.5" y1="4" x2="161.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="33.5" y1="6" x2="33.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="129.5" y1="6" x2="129.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="70.5" y1="5.46392e-08" x2="70.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="166.5" y1="5.46392e-08" x2="166.5" y2="26" stroke="white" stroke-width="3" />
                            </svg>
                        </div>
                        <div className="flex items-center p-3">
                            <button onClick={(e) => { e.preventDefault(); playNow(props[1]) }}>

                                <svg width="50" height="50" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 0.166656C9.49999 0.166656 0.166656 9.49999 0.166656 21C0.166656 32.5 9.49999 41.8333 21 41.8333C32.5 41.8333 41.8333 32.5 41.8333 21C41.8333 9.49999 32.5 0.166656 21 0.166656ZM16.8333 28.2917V13.7083C16.8333 13.5149 16.8872 13.3252 16.9889 13.1607C17.0906 12.9961 17.2361 12.8631 17.4091 12.7766C17.5822 12.6901 17.7759 12.6535 17.9685 12.6709C18.1612 12.6882 18.3452 12.7589 18.5 12.875L28.2292 20.1667C28.7917 20.5833 28.7917 21.4167 28.2292 21.8333L18.5 29.125C18.3452 29.2411 18.1612 29.3117 17.9685 29.3291C17.7759 29.3465 17.5822 29.3099 17.4091 29.2234C17.2361 29.1368 17.0906 29.0039 16.9889 28.8393C16.8872 28.6747 16.8333 28.4851 16.8333 28.2917Z" fill="url(#paint0_linear_2_414)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_2_414" x1="21" y1="0.166656" x2="21" y2="41.8333" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#76ABAE" />
                                            <stop offset="1" stop-color="#76ABAE" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex h-[80px] w-fit bg-black rounded-l-[80px] rounded-r-[50px] gap-4">
                        <div>
                            <img className="w-[80px] h-[80px] rounded-[80px]" src={props[2].album.cover} alt="" />
                        </div>
                        <div className="flex flex-col w-24 justify-center truncate">
                            <span className="text-md">
                                {props[2].title}
                            </span>
                            <span className="text-sm">
                                {props[2].artists[0].name}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <svg width="182" height="26" viewBox="0 0 182 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1.5" y1="6" x2="1.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="97.5" y1="6" x2="97.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="38.5" y1="4" x2="38.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="134.5" y1="4" x2="134.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="74.5" y1="4" x2="74.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="171.5" y1="4" x2="171.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="6.5" y1="6" x2="6.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="102.5" y1="6" x2="102.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="42.5" y1="5.46392e-08" x2="42.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="139.5" y1="5.46392e-08" x2="139.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="79.5" y1="6" x2="79.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="175.5" y1="6" x2="175.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="10.5" y1="4" x2="10.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="106.5" y1="4" x2="106.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="47.5" y1="4" x2="47.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="143.5" y1="4" x2="143.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="84.5" y1="6" x2="84.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="180.5" y1="6" x2="180.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="15.5" y1="5.46392e-08" x2="15.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="111.5" y1="5.46392e-08" x2="111.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="51.5" y1="6" x2="51.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="148.5" y1="6" x2="148.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="88.5" y1="6" x2="88.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="19.5" y1="4" x2="19.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="116.5" y1="4" x2="116.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="56.5" y1="6" x2="56.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="152.5" y1="6" x2="152.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="93.5" y1="5.46392e-08" x2="93.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="24.5" y1="6" x2="24.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="120.5" y1="6" x2="120.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="61.5" y1="6" x2="61.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="157.5" y1="6" x2="157.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="29.5" y1="6" x2="29.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="125.5" y1="6" x2="125.5" y2="20" stroke="white" stroke-width="3" />
                                <line x1="65.5" y1="4" x2="65.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="161.5" y1="4" x2="161.5" y2="22" stroke="white" stroke-width="3" />
                                <line x1="33.5" y1="6" x2="33.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="129.5" y1="6" x2="129.5" y2="21" stroke="white" stroke-width="3" />
                                <line x1="70.5" y1="5.46392e-08" x2="70.5" y2="26" stroke="white" stroke-width="3" />
                                <line x1="166.5" y1="5.46392e-08" x2="166.5" y2="26" stroke="white" stroke-width="3" />
                            </svg>
                        </div>
                        <div className="flex items-center p-3">
                            <button onClick={(e) => { e.preventDefault(); playNow(props[2]) }}>
                            <svg width="50" height="50" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 0.166656C9.49999 0.166656 0.166656 9.49999 0.166656 21C0.166656 32.5 9.49999 41.8333 21 41.8333C32.5 41.8333 41.8333 32.5 41.8333 21C41.8333 9.49999 32.5 0.166656 21 0.166656ZM16.8333 28.2917V13.7083C16.8333 13.5149 16.8872 13.3252 16.9889 13.1607C17.0906 12.9961 17.2361 12.8631 17.4091 12.7766C17.5822 12.6901 17.7759 12.6535 17.9685 12.6709C18.1612 12.6882 18.3452 12.7589 18.5 12.875L28.2292 20.1667C28.7917 20.5833 28.7917 21.4167 28.2292 21.8333L18.5 29.125C18.3452 29.2411 18.1612 29.3117 17.9685 29.3291C17.7759 29.3465 17.5822 29.3099 17.4091 29.2234C17.2361 29.1368 17.0906 29.0039 16.9889 28.8393C16.8872 28.6747 16.8333 28.4851 16.8333 28.2917Z" fill="url(#paint0_linear_2_414)" />
                                <defs>
                                    <linearGradient id="paint0_linear_2_414" x1="21" y1="0.166656" x2="21" y2="41.8333" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#76ABAE" />
                                        <stop offset="1" stop-color="#76ABAE" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}