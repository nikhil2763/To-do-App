import React from "react";
import { useNavigate } from "react-router-dom";

export default function Formlogin() {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-900 w-screen h-[100vh]  ">
      <div className="flex gap-5 pt-[100px]  justify-end">
        {" "}
        <div className="">
          <button onClick={(e)=>navigate('/sign-up')} className="text-center hover:bg-gray-400 hover:text-black text-white px-5 font-semibold font-['Roboto] text-[30px] border-2 block   rounded-lg  ">
            Sign Up
          </button>
        </div>
        <div className="mr-[200px]">
          <button onClick={(e)=>navigate('/login-page')}  className="text-center hover:bg-gray-400 hover:text-black text-white px-5 font-semibold font-['Roboto] text-[30px]  border-2  rounded-lg">
            Login
          </button>
        </div>
      </div>
      <div className="text-[50px] mt-[100px] text-center font-italic font-['Roboto] text-white ">
        Welcome To Our Page
      </div>
    </div>
  );
}
