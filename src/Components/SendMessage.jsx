import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa6";
import api from '../Axios';
import { useAIApp } from '../Context/UserContext';

const SendMessage = ({Loading, setLoading,Chats, setChats}) => {
    const [Text, setText] = useState('')

    const {runningChatId} = useAIApp()

    const SendMessageFun = ()=>{
        setLoading(true)
        const newChat = {
            Text:Text,
            From:'User'
        }
        setChats([...Chats,newChat])
        api.post(`message/${runningChatId}`,{message:Text})
        .then(res=>{
            const data = res.data.data
            setChats([...Chats,newChat,data])
        })
        .catch(err=>{
            console.log(err)
        })
        .finally(()=>{
            setLoading(false)
        })
        setText('')
        
    }
  return (
    <div className='h-full w-full flex justify-center items-center  lg:px-6  '>
        <div className='h-full overflow-hidden w-full bg-black rounded-xl px-2 py-2 bg-opacity-35 border-solid border flex flex-row border-black'>
           <textarea value={Text} onChange={(e)=>{
            setText(e.target.value)
           }} className='messages w-[85%] lg:w-[92%] border-none outline-none text-gray-900 bg-transparent resize-none overflow-y-auto' name="" id=""></textarea>
       
        <div className='flex  justify-center items-center text-right h-full w-[15%] lg:w-[8%]'>
        <IoSend onClick={SendMessageFun} className={`${Loading?'hidden':''} text-3xl cursor-pointer text-gray-900`} />
        <FaHourglassEnd  className={`${!Loading?'hidden':''} text-3xl cursor-wait text-black`} />

        </div>
        </div>
    </div>
  )
}

export default SendMessage