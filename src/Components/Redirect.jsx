import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useAIApp } from '../Context/UserContext'
import api from '../Axios'

const Redirect = () => {
  const navigate = useNavigate()

  const {ChatId, Chats ,setChats } = useAIApp()
  useEffect(()=>{
    if(ChatId){
      navigate(`/chat/${ChatId }`)
    }else{
      CreateChat()
    }
  },[])
  
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
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Layout>
        <div className='mt-5'>Redirect</div>
    </Layout>
  )
}

export default Redirect