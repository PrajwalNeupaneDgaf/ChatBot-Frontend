import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import api from '../Axios'
import { useNavigate } from 'react-router-dom'

const UserContextProvider = createContext()



const UserContext = ( {children}) => {
    const [user, setUser] = React.useState({})
    const [isLogged, setIsLogged] = React.useState(null)
    const [Chats , setChats] = React.useState([])
    const [ChatId , setChat] = React.useState(null)
    const [Loading, setLoading] = React.useState(true)
    const [runningChatId , setRunningChatId] = React.useState('')
    
    useEffect(()=>{
        api.get('me')
        .then(response => {
            setUser(response.data.user)
            const chats = response.data.user.chats
            setChats(response.data.user.chats)
            setIsLogged(true)
            if(chats){
                setChat(chats[0]?.id)
            }
      
            })
            .catch(error => {
                setUser({})
                setIsLogged(false)
                console.error(error)
                })
            .finally(()=>{
                setLoading(false)
            })
    },[])
    const handleDelete = ()=>{
       api.delete(`chat/delete/${runningChatId}`)
       .then(res=>{
        console.log(res)
        location.reload()
       })
       .catch(er=>{
        console.log(er)
       })
    }
  return (
   <UserContextProvider.Provider value={{
    user, setUser, isLogged, setIsLogged, Chats, setChats,ChatId,handleDelete,setRunningChatId ,runningChatId
   }}>
  {
    <div>        
            {Loading ? <div>Loading...</div> : children}        
    </div>
  }
   </UserContextProvider.Provider>
  )
}

export default UserContext

export const  useAIApp = ()=>{
    return useContext(UserContextProvider)
}