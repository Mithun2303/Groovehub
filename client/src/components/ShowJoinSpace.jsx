import React, { useState } from 'react'
import close from "../assets/close.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const ShowJoinSpace = ({ setShowJoinSpace }) => {
    const navigate = useNavigate();
    const [spaceId, setSpaceId] = useState("");
    const [errormessage, seterrrormessage] = useState("");
    const [showError, setShowError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(spaceId)
        if (spaceId.length != 0 && spaceId.length == 6) {
            axios.get(`http://54.163.212.62:8121/api/user/space/${spaceId}`, { withCredentials: true }).then((res) => {
                console.log(res);    
                navigate(`/space/${spaceId}`)
        }).catch((error)=>{
            console.log(error.response);
                setShowError(true);
                seterrrormessage(error.response.data.message)
            })
        }
        else {
            setShowError(true);
            seterrrormessage("Invalid space id");
        }
    }
    return (
        <div className="w-[30vw] h-[50vh] absolute  bg-[rgba(118,171,174,0.8)] bg-cover bg-center my-[25vh] shadow-md shadow-primary   mx-[35vw]"
        >
            <button className=' w-full h-[10%] flex flex-row-reverse' onClick={(e) => { e.preventDefault(); setShowJoinSpace(false) }}>
                <img src={close} alt="" className='w-[30px]' />
            </button>

            <form className='w-full flex  flex-col h-[80%] gap-4 justify-center items-center' onSubmit={(e)=>handleSubmit(e)}>
                <span className='text-4xl font-semibold'>
                    Join Space
                </span>
                <input type="text" placeholder='Enter Space ID' className='p-5 outline-none text-white bg-dark' onChange={(e)=>setSpaceId(e.target.value)}/>
                <button type="submit" onClick={handleSubmit} className='bg-dark p-3 rounded-xl text-primary'>Submit</button>
            {showError &&
                <span className='text-xl flex  justify-center underline'>
                    {errormessage}!
                </span>
            }
            </form>
        </div>
    )
}
