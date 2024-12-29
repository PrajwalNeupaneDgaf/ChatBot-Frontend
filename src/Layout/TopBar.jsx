import React from 'react'
import { useAIApp } from '../Context/UserContext'
import { CiMenuBurger } from "react-icons/ci";


const TopBar = ({values}) => {

    const {user} = useAIApp()
  return (
    <div className='absolute top-0 left-0 right-0 z-20 bg-gray-300 h-12'>
        <div className='flex flex-row px-3 items-center h-full justify-between w-full'>
            <div
            onClick={()=>{
                values.setHide(!values.hide)
            }}            
            className='pl-4 scale-y-75'><CiMenuBurger className='cursor-pointer text-xl lg:text-3xl'/></div>
            <div className='text-slate-600 lg:text-lg text-md lg:font-semibold'>ASK HOMEWORK AI</div>
            <div className='font-sans text-sm font-light text-white bg-blue-500 h-full flex justify-center items-center px-1 lg:px-4 border-solid border-l-2 lg:border-l-4 border-[#1a1818]'>{user?.name}</div>
        </div>
    </div>
  )
}

export default TopBar