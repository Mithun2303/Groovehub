import { React, useRef } from "react";
import logo from "./assets/logo-bgless.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import instagram from "./assets/instagram.svg";
import gmail from "./assets/gmail.svg";
import x from "./assets/x.svg";
import { fb, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


// import Signup2 from "./signup-2";
function LoadPicture({ obj,setObj,register }) {
  const username= obj.username;
  const host = "http://127.0.0.1:8000";
  const fileInputRef = useRef(null);
  const [file, setfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileInputChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    setfile(e.target.files[0]);
  };

  const handleNext = async () => {
    if (!selectedFile) {
      // onNext(2);
      register();
    }
    else {
      const imageRef = ref(storage, `users/${username}`);
      await uploadBytes(imageRef, file).then((response) => {
        console.log(response);
      });
      try {
        const downloadURL = await getDownloadURL(imageRef);
        console.log(downloadURL);
        let robj = obj;
        robj.displaypic = downloadURL;
        await setObj(robj);
        // console.log(obj);
        register();
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
      // localStorage.setItem('temitopefilloc',selectedFile);
    };
  }
  return (
    <main className="bg-dark w-screen h-screen flex justify-center items-center">
      <div className="w-[35vw] h-[70vh] rounded-r-[30%] bg-primary flex flex-col">
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
      <div className="bg-textbox  w-[25vw] h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-white text-xl font-semibold  ">Choose a profile picture</h1>
        <div className="img w-[80%] mx-[10%] items-center text-gray1 justify-center flex flex-col gap-5">
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : "https://firebasestorage.googleapis.com/v0/b/groovehub-c074d.appspot.com/o/images%2Ficons8-panda-100.png?alt=media&token=96e0c4e7-213f-412b-9102-379892417214"}
            alt="Profile"
            className="w-[200px] h-[200px] relative p-8 rounded-[50%]" 
          />
          <input
            type="file"
            name=""
            ref={fileInputRef}
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <button
            onClick={(e) => fileInputRef.current.click(e)}
            className="bg-primary w-[100%] px-4 py-2 rounded-2xl"
          >
            {selectedFile ? "Change File" : "Choose file"}
          </button>
          <button
            className="bg-primary px-4 py-2 w-[100%] rounded-2xl"
            onClick={handleNext}
          >
            {selectedFile ? "Done" : "Skip"}
          </button>
        </div>
      </div>

    </main>
  );
}

export default LoadPicture;
