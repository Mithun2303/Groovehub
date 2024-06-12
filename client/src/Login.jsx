import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gmail from "./assets/gmail.svg";
import google from "./assets/google.svg";
import instagram from "./assets/instagram.svg";
import logo from "./assets/logo-bgless.svg";
import x from "./assets/x.svg";
import { host } from "./host";
import Signup from './Signup';


export const Login = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [toggleValue, setValue] = useState(false);
    let [errormessage, seterrrormessage] = useState("");
    let [pwdcrct, setpwdcrct] = useState(true);
    const toggleSetValue = () => {
        setValue(!toggleValue);
    };

    const RenderEye = () => {
        if (toggleValue) {
            return (
                <svg
                    className=""
                    width="20px"
                    height="20px"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#000000"
                >
                    <path
                        d="M12 14a2 2 0 100-4 2 2 0 000 4z"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                    <path
                        d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
            );
        } else
            return (
                <svg
                    className=""
                    width="20px"
                    height="20px"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#000000"
                >
                    <path
                        d="M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                    <path
                        d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
            );
    };

    const usernamepattern = /^[a-zA-Z0-9._-]{3,20}$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const handleClick = (e) => {
        e.preventDefault();
        console.log("username");
        axios
            .post(host + "/api/auth/login/", {
                username: username,
                password: password
            }, { withCredentials: true })
            .then((res) => {
                if (res.status == 200) {
                    localStorage.setItem("username",username);
                    localStorage.setItem("dp",res.data.dp);
                    handleLogin(username);
                    console.log(res);
                    navigate("/");
                }
                else {
                    throw (res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                seterrrormessage(err.response.data.message);
                setpwdcrct(false);
                console.log("hello")
            });

    };

    return isLogin === true ?
        <main className="bg-dark w-screen h-screen flex justify-center items-center transition-shadow">
            <div className="w-[25vw] h-[70vh] bg-textbox  flex justify-center items-center">
                <div className="flex flex-col gap-5">
                    <h1 className="text-primary text-4xl text-center font-[myFone]">
                        Welcome Back
                    </h1>
                    <div className="flex flex-col gap-4">
                        <div>
                            <input type="text"
                                placeholder="Username"
                                className={`username outline-none rounded-2xl bg-gray1 h-12 px-4 placeholder:text-lg w-[100%] text-black placeholder:text-black`}
                                required
                                onChange={(e) => { setusername(e.target.value); }} />
                        </div>
                        <div className='flex justify-between w-[100%]'>
                            <input type={toggleValue ? "text" : "password"}
                                placeholder="Password"
                                className={`Passowrd outline-none  w-[85%] rounded-l-2xl bg-gray1 h-12 px-4 placeholder:text-lg  text-black placeholder:text-black`}
                                required
                                onChange={(e) => { setpassword(e.target.value); }} />
                            <span
                                className="hover:cursor-pointer  w-[15%] justify-start pr-3 bg-white rounded-r-2xl flex items-center"
                                onClick={toggleSetValue}
                            >
                                <RenderEye />
                            </span>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="p-3 w-[50%] bg-primary rounded-lg text-gray1"
                                onClick={(e) => { handleClick(e) }}
                            >
                                Get in
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-center ">
                            <div className={`my-auto ${pwdcrct == true ? "hidden" : "mb-2"} flex justify-center rounded-lg bg-gray1 text-center w-fit p-2`}>
                                <span className="text-primary font-light p-1    ">{errormessage}</span>
                            </div>
                        </div>

                        {/* <div className="flex justify-center text-lg text-gray1 items-center w-full">
                            <hr className="border-1 border-gray1 w-[40%]" />
                            <span className="w-[20%] flex text-lg justify-center ">
                                or
                            </span>
                            <hr className="border-1 border-gray1 w-[40%]" />
                        </div>
                        <div className="w-full rounded-[50%]  flex justify-center">
                            <button onClick={(e) => {
                                // e.preventDefault(); login()
                            }}
                                className="bg-white p-2 rounded-[50%]">
                                <img src={google} alt="" className="rounded-[50%] w-[25px]" />
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="w-[30vw] h-[70vh] rounded-l-[30%] bg-primary flex flex-col">
                <div className="flex flex-col gap-5 justify-center items-center h-[90%]">
                    <div className="flex justify-center items-center">
                        <img src={logo} alt="" className="w-1/2 " />
                    </div>
                    <div className="px-8 text-gray1 text-center">
                        <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </span>
                    </div>
                </div>
                <div className="text-center">
                    <span className="text-gray1  relative text-md">
                        Need an account?
                        <button
                            onClick={(e) => { e.preventDefault(); setIsLogin(false); }}
                            className="hover:text-gray1 font-bold  underline mx-1 text-textbox"
                        >
                            Sign up
                        </button>
                    </span>
                </div>
                <div className="flex flex-col justify-end items-center">
                    <div className="flex justify-center px-8 text-lg text-gray1 items-center w-full">
                        <hr className="border-1 border-gray1 w-[30%]" />
                        <span className="w-fit mx-1 flex text-sm  justify-center ">
                            Connect with us
                        </span>
                        <hr className="border-1 border-gray1 w-[30%]" />
                    </div>
                    <div className="h-[10vh] flex ">
                        <a href="https://instagram.com" className="p-2">
                            <img src={instagram} alt="" className="w-[40px]" />
                        </a>
                        <a href="https://mail.google.com" className="p-2">
                            <img src={gmail} alt="" className="w-[40px]" />
                        </a>
                        <a href="https://mail.google.com" className="p-2">
                            <img src={x} alt="" className="w-[40px]" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
        : <Signup setIsLogin={setIsLogin} handleLogin={handleLogin} />
}


