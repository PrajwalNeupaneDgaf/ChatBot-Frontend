import React from 'react'

const RightSideIntro = ({text}) => {
  return (
    <div className='w-full bg-[wheat] h-[100vh]'>
       <div className='text-6xl font-bold scale-y-150 pt-10 px-6'>
                Hello !
                <div className='text-4xl px-6 text-blue-600'>
                AI Users
                <div className='text-3xl px-6 text-red-400'>
                    {text} Pal .
                </div>
            </div>
       </div>
       <div className='pt-12 px-12'>
            <div className='text-3xl font-semibold'>
                Gladly Presenting This App
            </div>
            <div className='text-lg pt-4 font-semibold px-12'>
                This Chatbot is developed by Prajwal Neupane.
                <br />
                Feel free to use All the Features Available.
                <div className='text-md font-normal'>
                    <div className='text-xl font-semibold pt-5 text-gray-800'>
                        Some Points-
                    </div>
                    <ul className='text-[#0c0e0a] font-semibold pt-3 px-12'>
                        <li>Login Your Account.</li>
                        <li>Your Email Verification is Not Required.</li>
                        <li> This Product Is Under Production.</li>
                        <li>If You Forget Gmail or Password Forget Your Id.</li>
                    </ul>
                </div>
            </div>
       </div>
    </div>
  )
}

export default RightSideIntro