import React, { useEffect, useState } from 'react'
import { useAIApp } from '../Context/UserContext'
import { PiChatsCircle } from "react-icons/pi";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import api from '../Axios';

const SideBar = ({values }) => {

  const {setUser, setIsLogged, Chats, setChats, handleDelete} = useAIApp()

  const [isLoggingOutShown, setIsLoggingOutShown] = useState(false)
  const [DeleteBar, setDeleteBar] = useState(false)

  const navigate = useNavigate()


  const CreateChat = () => {
    api
      .post("chat/create")
      .then((response) => {
        const data = response.data;
        if(Chats.length>0){
          setChats([...Chats, data]);
        } else{
          setChats([data]);
        }      
        navigate(`/chat/${data.ID}`);
        location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  return (
    <div className={`absolute shadow-sm transition-all duration-300 shadow-current z-10 top-0 left-0 bottom-0 ${values.hide?'lg:w-16 hidden lg:block':'w-36'} bg-gray-300`}>
      <div className='h-full w-full flex items-center flex-col pt-16'>
        <div
        className='w-full h-[10%] bg-gray-200 flex justify-center items-center px-1'
        >
          <div onClick={CreateChat} className='px-2 whitespace-nowrap overflow-hidden flex items-center justify-center py-2 bg-opacity-25 border border-solid border-gray-800 cursor-pointer w-full bg-black rounded'>
          <MdAdd className='text-xl'/>  <span className={`${values.hide?'hidden':''} font-semibold`}>Create New</span>
          </div>
        </div>
        <div
        className='sidebar overflow-y-scroll flex flex-col pt-3 px-1 items-center gap-3 w-full h-[75%]'
        >
          {
            Chats?.map((itm,idx)=>{
              return(
                <div
                key={idx}
                onClick={()=>{
                  navigate(`/chat/${itm.id}`)
                }}
                className={`w-full h-10 bg-white ${values.hide?'justify-center':''} cursor-pointer rounded flex px-2 items-center  bg-opacity-25 border border-solid overflow-hidden border-black`}
                >
                 <span> <PiChatsCircle /> </span><span className={`text-xs pr-1 ${values.hide?'hidden':'block'} ml-2 whitespace-nowrap`}>{
                    itm?.Name
                    }</span>
                </div>
              )
            })
          }
        </div>
        <div
        className='w-full h-[15%] py-4 flex justify-center flex-col px-2 gap-2 bg-white'
        >
        <div 
        onClick={()=>{
          setDeleteBar(true)
        }}
        className={'flex justify-center items-center bg-red-400 py-1 rounded hover:bg-red-500 cursor-pointer'}>
        <MdDelete className='text-xl text-red-900' /> <span className={`${values.hide?'hidden':''}`}>
          Delete
          </span>
        </div>
        <div
        onClick={()=>{
          setIsLoggingOutShown(true)
        }}
        className='flex justify-center items-center bg-blue-500 py-1 rounded hover:bg-blue-700 cursor-pointer'>
        <IoIosLogOut className='text-xl text-white' /> <span className={`${values.hide?'hidden':''}`}>
           Logout
            </span>
        </div>
         </div>
      </div>
      <div onClick={()=>{
        setIsLoggingOutShown(false)
      }} className={`${isLoggingOutShown?'flex':'hidden'} pt-20 backdrop-blur-sm bg-opacity-30 justify-center h-[100vh] w-[100vw] top-0 left-0 right-0 bottom-0 absolute bg-black z-30`}>
        <div className='absolute z-50 flex flex-col gap-3 rounded  bg-opacity-50  bg-black p-8 cursor-pointer'>
          <div className='text-white font-xl '>
            Do you Want To Logout From Your ID?
          </div>
          <div className='flex justify-end gap-4'>
            <button className='bg-white p-2 px-4 rounded bg-opacity-50'>
              Cancel
              </button>
              <button onClick={()=>{
                localStorage.removeItem('token')
                setChats([])
                setUser({})
                setIsLogged(false)
                navigate('/login')
              }} className='bg-red-700 px-6 rounded'>
                Logout
              </button>
          </div>
        </div>
      </div>
      <div onClick={()=>{
        setDeleteBar(false)
      }} className={`${DeleteBar?'flex':'hidden'} pt-20 backdrop-blur-sm bg-opacity-30 justify-center h-[100vh] w-[100vw] top-0 left-0 right-0 bottom-0 absolute bg-black z-30`}>
        <div className='absolute z-50 flex flex-col gap-3 rounded  bg-opacity-50  bg-black p-8 cursor-pointer'>
          <div className='text-white font-xl '>
            Do you Want To Delete This Chat?
          </div>
          <div className='flex justify-end gap-4'>
            <button className='bg-white p-2 px-4 rounded bg-opacity-50'>
              Cancel
              </button>
              <button onClick={handleDelete} className='bg-red-700 px-6 rounded'>
                Delete
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar