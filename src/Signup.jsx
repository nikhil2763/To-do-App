import React, { useEffect, useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    
    // Create a new user object
    const newUser = {
      name,
      email,
      password,
    };

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || []; // Default to an empty array if none exist

    // Add the new user to the existing users
    existingUsers.push(newUser);

    // Save the updated user list back to localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Clear input fields
    setName("");
    setEmail("");
    setPassword("");

    // Navigate to the login page
    navigate("/login-page");
  }

  return (
    <div className="w-full h-[100vh] bg-blue-950 grid place-items-center">
      <div className="w-full max-w-[400px] m-auto bg-blue-900 p-6 rounded-lg shadow-2xl shadow-gray-500">
        <h2 className="text-[30px] text-white text-center pb-[20px]">
          User Sign Up Page
        </h2>
        <form className="w-full flex-col" onSubmit={handleSubmit}>
          <div className="flex items-center pb-4">
            <MdOutlineDriveFileRenameOutline className="text-[30px] text-blue-500 mr-2" />
            <input
              type="text"
              className="bg-blue-900 text-[30px] text-white underline p-2 w-full"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="mt-2 mb-3 text-center">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-500 border-2 text-white rounded-lg text-[20px] py-2 px-4 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
