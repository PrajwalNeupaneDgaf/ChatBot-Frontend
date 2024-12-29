import React, { useEffect, useState } from "react";
import RightSideIntro from "../Components/RightSideIntro";
import { useNavigate } from "react-router-dom";
import { useAIApp } from "../Context/UserContext";
import api from "../Axios";

const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Loading , setLoading] = useState(false)

  const navigate = useNavigate()

const {setUser, isLogged, setIsLogged,setChats} = useAIApp()

useEffect(() => {
  if (isLogged) {
    navigate('/')
    }

}, []);


const HandleSubmit = ()=>{
  setLoading(true)
  if(!Email || !Password){
    setLoading(false)
    return
  }
  const data = {email:Email , password:Password}
  setEmail('')
  setPassword('')
  api.post('login',data)
  .then(res=>{
   const  data = res.data
   localStorage.setItem('token',data.token)
   setUser(data.user)
   setChats(data.user.chats)
   setIsLogged(true)
   navigate('/')
  }).catch(err=>{
    console.log(err)
  }).finally(()=>{
    setLoading(false)
  })
}
  return (
    <div className="lg:grid grid-cols-2">
      <div className="hidden lg:block">
        <RightSideIntro text={'Welcome Back'}/>
      </div>
      <div className="flex gap-5 flex-col px-3 lg:px-0 lg:items-center pt-8 h-[100vh] w-[100vw] lg:w-auto bg-gray-400">
        <div className=" text-center text-3xl lg:text-5xl text-red-600 font-serif font-extrabold scale-y-150">
          Welcome Back!
        </div>
        <div className="text-3xl font-bold pt-5 text-center">Login</div>
        <div>
          <div className="relative group">
            <label
              htmlFor="email"
              className={` ${Email?'-top-2 text-lg':''} text-xl font-semibold transition-shadow duration-200 absolute bottom-3  group-focus-within:-top-2 group-focus-within:text-lg`}
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={Email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              className="text-lg bg-transparent pt-4 pb-2 border-b-2 border-solid border-black outline-none px-5 w-[100%] lg:w-[130%]"
            />
          </div>
          <div>
            <div className="relative mt-3 group">
                <label 
                htmlFor="Password"
                className={`${Password?'-top-2 text-lg':''} text-xl font-semibold absolute bottom-4 group-focus-within:text-lg group-focus-within:-top-2`}
                >
                  Password:
                </label>
                <input 
                type="password" 
                id="Password"
                value={Password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                className={` bg-transparent text-lg pt-4 pb-2 border-solid border-black border-b-2 outline-none px-5 w-[100%] lg:w-[130%]`}
                />
            </div>
          </div>  
          <div className="pt-3 text-center">
                Don't have an account? <b 
                onClick={()=>{
                  navigate('/register')
                }}
                className="cursor-pointer">Signup</b>
          </div>       
          <div className="pt-4 w-full flex items-center">
                <button 
                onClick={()=>{
                  if(!Loading){
                    HandleSubmit()
                  }
                }}
                className={` ${Loading?'cursor-not-allowed bg-green-400':''} w-full py-3 text-lg font-semibold transition-all duration-200 hover:text-white bg-green-600 hover:bg-green-800 rounded-lg`}>
                 { Loading?'please Wait...':'Login'}
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
