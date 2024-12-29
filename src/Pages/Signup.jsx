import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../Axios'
import { useAIApp } from '../Context/UserContext'
import { toast } from 'react-toastify';
import RightSideIntro from '../Components/RightSideIntro';

const Signup = () => {
const [email, setemail] = useState('')
const [name, setname] = useState('')
const [password, setpassword] = useState('')
const [Loading, setLoading] = useState(false)

const navigate = useNavigate()

const {setUser, isLogged, setIsLogged} = useAIApp()

useEffect(() => {
  if (isLogged) {
    navigate('/')
    }

}, []);

  const handleSignup = ()=>{
    const user = {email, name, password}
    if(!email || !name || !password){
      return
    }
    setLoading(true)
    setemail('')
    setname('')
    setpassword('')
    api.post('register',user)
    .then((res)=>{
      const data = res.data
      localStorage.setItem('token',data.token)
      toast.success('Successfully Registered')
      setIsLogged(true)
      setUser(data.User)
      navigate('/')
      })
      .catch((err)=>{
        toast.error('Try Again Later')
        console.log(err)
        })
        .finally(()=>{
          setLoading(false)
        })
  }
  return (
    <div className='lg:grid grid-cols-2'>
     <div className="flex gap-5 flex-col px-3 lg:px-0 lg:items-center pt-8 h-[100vh] w-[100vw] lg:w-auto bg-gray-400">
        <div className=" text-center text-3xl lg:text-5xl text-red-600 font-serif font-extrabold scale-y-150">
          Welcome New User!
        </div>
        <div className="text-3xl font-bold pt-5 text-center">Signup</div>
        <div>
          <div className="relative group">
            <label
              htmlFor="email"
              className={` ${name?'-top-2 text-lg':''} text-xl font-semibold transition-shadow duration-200 absolute bottom-3  group-focus-within:-top-2 group-focus-within:text-lg`}
            >
              Name:
            </label>
            <input
              id="text"
              type="email"
              value={name}
              onChange={(e)=>{
                setname(e.target.value)
              }}
              className="text-lg bg-transparent pt-4 pb-2 border-b-2 border-solid border-black outline-none px-5 w-[100%] lg:w-[130%]"
            />
          </div>
          <div className="relative group mt-2">
            <label
              htmlFor="email"
              className={` ${email?'-top-2 text-lg':''}  text-xl font-semibold transition-shadow duration-200 absolute bottom-3  group-focus-within:-top-2 group-focus-within:text-lg`}
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e)=>{
                setemail(e.target.value)
              }}
              className="text-lg bg-transparent pt-4 pb-2 border-b-2 border-solid border-black outline-none px-5 w-[100%] lg:w-[130%]"
            />
          </div>
          <div>
            <div className="relative mt-3 group">
                <label 
                htmlFor="Password"
                className={`${password?'-top-2 text-lg':''} text-xl font-semibold absolute bottom-4 group-focus-within:text-lg group-focus-within:-top-2`}
                >
                  Password:
                </label>
                <input 
                type="password" 
                id="Password"
                value={password}
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}
                className={` bg-transparent text-lg pt-4 pb-2 border-solid border-black border-b-2 outline-none px-5 w-[100%] lg:w-[130%]`}
                />
            </div>
          </div>  
          <div className="pt-3 text-center">
                Do have an account? <b 
                onClick={()=>{
                  navigate('/login')
                }}
                className="cursor-pointer">Login</b>
          </div>       
          <div className="pt-4 w-full flex items-center">
                <button 
                onClick={()=>{
                  if(!Loading){
                    handleSignup()
                  }
                }}
                className={` ${Loading?'cursor-not-allowed bg-green-400':''} w-full py-3 text-lg font-semibold transition-all duration-200 hover:text-white bg-green-600 hover:bg-green-800 rounded-lg`}>
                 { Loading?'please Wait...':'Signup'}
                </button>
          </div>
        </div>
      </div>

      <div className='hidden lg:block'>
      <RightSideIntro text={'Warm Welcome'}/>  
      </div>      
    </div>
  )
}

export default Signup