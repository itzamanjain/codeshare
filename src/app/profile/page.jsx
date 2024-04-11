/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React,{useState,useEffect} from 'react'
import axios from 'axios'


// this is user profile here we are going to show their name , email , etc, and all the code that they have uploaded  post [] 
const page = () => {
    const [username,setUsername] = useState()
    const showProfile = async() => {
        try {
            const data = await axios.post(`api/users/me`)
            console.log(data.data.data.email);
            const { username, email, code } = data.data.data;
            // console.log(username, email, code);
            setUsername(username)
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <>
        <div className='text-center text-3xl '>profile page</div>
        <p>`Hello , ${username}`</p>
        <button onClick={showProfile} className=" mt-4 mb-4 bg-[#1c1c1c] text-white rounded py-2 px-4 hover:bg-[#161616] transition duration-300" >
            Fetch profile Data
        </button>
    </>
  )
}

export default page