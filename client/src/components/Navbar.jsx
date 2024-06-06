export const Navbar = () => {
    return (
        <header className="flex justify-evenly items-center text-white font-extralight text-sm mt-4">
                <div>
                    <span className="hover:underline">
                        Discover
                    </span>
                </div>
                <div>
                    <span className="hover:underline">
                        Latest
                    </span>
                </div>
                <div>
                    <span className="hover:underline">
                        Trending
                    </span>
                </div>
                <div>
                    <span className="hover:underline">
                        Popular
                    </span>
                </div>
                <div className="flex bg-black gap-2 p-2 rounded-2xl items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.25 11.25L14.25 14.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.5 12.25C10.1234 12.25 12.25 10.1234 12.25 7.5C12.25 4.87665 10.1234 2.75 7.5 2.75C4.87665 2.75 2.75 4.87665 2.75 7.5C2.75 10.1234 4.87665 12.25 7.5 12.25Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type="text" placeholder="Search" className="bg-black outline-none text-white" />
                </div>
                <div className="mt-1">
                    <div>
                        <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_2_364)">
                                <rect x="4" width="32" height="31" rx="12" fill="black" />
                                <line x1="11" y1="9.5" x2="29" y2="9.5" stroke="white" />
                                <line x1="11" y1="13.5" x2="29" y2="13.5" stroke="white" />
                                <line x1="11" y1="17.5" x2="29" y2="17.5" stroke="white" />
                                <line x1="11" y1="21.5" x2="29" y2="21.5" stroke="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_2_364" x="0" y="0" width="40" height="39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_364" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_364" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
            </header>
    )
}