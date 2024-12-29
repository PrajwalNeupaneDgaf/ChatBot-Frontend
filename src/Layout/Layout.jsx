import React, { useEffect, useState } from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import { useAIApp } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const Layout = ( {children}) => {
  const [hide , setHide] = useState(true)

  const {isLogged} = useAIApp()

  const navigate = useNavigate() 
  useEffect(()=>{
    if(!isLogged){
      navigate('/login')
    }
   },[])



  return (
    <div>
       <TopBar values = {{hide , setHide}}/>
       <SideBar values = {{hide , setHide}}/>
        <div className={`h-[100vh] transition-all duration-500 w-[100vw] absolute pt-14 pl-2 ${!hide?'lg:pl-[9.6rem]':'lg:pl-[5.6rem]'} bg-[#2e2d2b31]`}>
            {children}
        </div>
    </div>
  )
}

export default Layout