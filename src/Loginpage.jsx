import React, { useEffect, useState } from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// Function to retrieve users from localStorage
let getlocalitem = () => {
  const list = localStorage.getItem("users");
  return list ? JSON.parse(list) : []; // Return an empty array if no data
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to display error messages
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Retrieve users from localStorage
    const users = getlocalitem();

    // Check if the email and password match any user
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
  

    if (foundUser) {
      // Successful login: Navigate to a new page (e.g., dashboard)
      setErrorMessage("");
      navigate("/todo-app"); // Replace with the correct route
    } else {
      // Show error message if login fails
      setErrorMessage("Invalid email or password");
    }
    
    
  }
  useEffect(()=>{
    localStorage.setItem('loginuser',JSON.stringify(email))
  },[email]);

  return (
    <div className="w-full h-[100vh] bg-blue-950 grid place-items-center">
      <div className="w-full max-w-[400px] m-auto bg-blue-900 p-6 rounded-lg shadow-2xl shadow-gray-500">
        <h2 className="text-[30px] text-white text-center pb-[20px]">
          User Login Page
        </h2>
        <form className="w-full flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center pb-4">
            <MdMarkEmailUnread className="text-[30px] text-blue-500 mr-2" />
            <input
              type="email"
              className="bg-blue-900 text-[30px] text-white underline p-2 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center pb-4">
            <RiLockPasswordFill className="text-[30px] text-blue-500 mr-2" />
            <input
              type="password"
              className="bg-blue-900 text-[30px] text-white underline p-2 w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mb-3">{errorMessage}</div>
          )}
          <div className="mt-2 mb-3 text-center">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-500 border-2 text-white rounded-lg text-[20px] py-2 px-4 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
