import React from "react";
import logo from "./assets/logo-bgless.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import instagram from "./assets/instagram.svg";
import gmail from "./assets/gmail.svg";
import axios from "axios";
import x from "./assets/x.svg";
import LoadPicture from "./LoadPicture";

// import Signup2 from "./signup-2";
function Signup({ onNext, setIsLogin, handleLogin }) {

    const host = "http://54.163.212.62:8121";
    const navigate = useNavigate();
    const [reqObj, setReqObj] = useState({
        username: "",
        email: "",
        displaypic: "https://firebasestorage.googleapis.com/v0/b/groovehub-c074d.appspot.com/o/images%2Ficons8-user-96.png?alt=media&token=dd454866-a584-486f-b67f-7e55a90f9aa0",
        password: ""
    });
    const [loadPicture, setLoadPicture] = useState(false);
    let [username, setusername] = useState("");
    let [email, setemail] = useState("");
    let [password, setpassword] = useState('');
    let [showerror, setError] = useState(true);
    let [errormessage, seterrrormessage] = useState("");
    let [userfound, setuserfound] = useState(false);
    const [toggleValue, setValue] = useState(false);
    const handleChangeProfile = (url) => {
        let obj = reqObj;
        obj.profilepic = url;
        setReqObj(obj);
        console.log(reqObj);
    }
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
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#000000"
                >
                    <path
                        d="M12 14a2 2 0 100-4 2 2 0 000 4z"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            );
        } else
            return (
                <svg
                    className=""
                    width="20px"
                    height="20px"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#000000"
                >
                    <path
                        d="M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            );
    };

    function handleClick(e) {
        console.log(reqObj);
        e.preventDefault();
        // window.alert("hello");
        axios.get(host + `/api/auth/checkusername/${username}`).then(
            (res) => {
                console.log(res.status);
                setuserfound(true);
                let obj = reqObj;
                obj.username = username;
                obj.email = email;
                obj.password = password;
                setReqObj(obj);
                setLoadPicture(true);
                // alert("hello")
                // handleSignup1(username, email, phno);
                seterrrormessage("");
                // onNext(1);
                // }
            }
        ).catch((err) => {
            console.log(err);
            setError(false);
            seterrrormessage(err.response.data.message);
        })

        // onNext(1);
    }
    const register = () => {
        console.log(reqObj);
        axios.post(host + "/api/auth/register", {
            username: reqObj.username,
            password: reqObj.password,
            email: reqObj.email,
            displaypic: reqObj.displaypic
        }).then((res) => {
            console.log(res.data);
            handleLogin();
            navigate("/")
        }).catch((err) => {
            console.err(err.message);
        })
    }

    return loadPicture === false ?
        <main className="bg-dark w-screen h-screen flex justify-center items-center">

            <div className="w-[30vw] h-[70vh] rounded-r-[30%] bg-primary flex flex-col ">
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
                        Already an user
                        <button
                            onClick={(e) => { e.preventDefault(); setIsLogin(true); }}
                            className="hover:text-gray1 font-bold  underline mx-1 text-textbox"
                        >
                            Sign in
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
            <div className="w-[25vw] h-[70vh] bg-textbox  flex justify-center items-center">
                <form className="flex flex-col gap-5">
                    <h1 className="text-primary text-2xl text-center">
                        Create an account.
                    </h1>
                    <div>
                        <input type="text"
                            placeholder="Username"
                            className={`username outline-none ${showerror === false ? "border-2 border-primary" : ""} rounded-2xl bg-gray1 h-12 px-4 placeholder:text-lg w-[100%] text-black placeholder:text-black`}
                            required
                            onChange={(e) => setusername(e.target.value)} />
                    </div>
                    <div>
                        <input type="text"
                            placeholder="Email"
                            className={`email outline-none rounded-2xl bg-gray1 h-12 px-4 placeholder:text-lg w-[100%] text-black placeholder:text-black`}
                            required
                            onChange={(e) => setemail(e.target.value)} />
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
                    <div className="flex justify-center ">
                        <div className={`my-auto ${showerror == true ? "hidden" : "mb-2"} flex justify-center rounded-lg bg-gray1 text-center w-fit p-2`}>
                            <span className="text-primary font-light p-1    ">{errormessage}</span>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <button
                            className="bg-primary p-3 text-gray1 rounded-2xl"
                            onClick={(e) => { handleClick(e); }}
                        >
                            Create...
                        </button>
                    </div>
                </form>
            </div>
        </main> :
        <LoadPicture handleChangeProfile={handleChangeProfile} obj={reqObj} setObj={setReqObj} register={register} />

}

export default Signup;