import React, { useEffect } from "react";
import AiText from "./AiText";
import { useParams } from "react-router-dom";
import { useAIApp } from "../Context/UserContext";
import api from "../Axios";

const Messages = ({ setChats,Chats, Loading }) => {

  const {id} = useParams()

  const {setRunningChatId} = useAIApp()

  useEffect(()=>{
    if(id){
      setRunningChatId(id)
      api.get(`chat/${id}`)
      .then(res=>{
        const data = res.data.data
        setChats(data)
      })
    }
  },[id])

  return (
    <div className="flex flex-col gap-3 w-full relative">
      {Chats?.map((itm, idx) => {
        return (
          <div key={idx} className="flex flex-row gap-2">
            <div className="h-12 w-12 bg-opacity-70 flex justify-center items-center bg-black text-white rounded-full">
              {itm.From == "User" ? "U" : "AI"}
            </div>
            <div className="flex flex-col w-[90%] bg-black bg-opacity-20 rounded p-2 py-2 px-3">
              {
                itm.By=='User'?<textarea value={itm.Text} readOnly className="resize-none bg-transparent h-fit outline-none border-none cursor-auto"></textarea>: <AiText Text={itm.Text}/>
              }
              <div className="text-right text-xs pt-2 w-full">-{itm.From}</div>
            </div>
          </div>
        );
      })}
      <div className={`${Loading?'flex':'hidden'} w-full relative  flex-row gap-3`}>
        <div className="h-12 w-12 bg-opacity-70 flex justify-center items-center bg-black text-white rounded-full">
          W
        </div>
        <div className=" flex flex-col w-[90%] bg-black bg-opacity-20 rounded p-2 py-2 px-3 relative overflow-hidden">
          <div className=" loading-flash text-md relative flex flex-row justify-between z-10">
            <div className="h-full w-32 bg-black"></div>
            <div className="h-full w-32 bg-black"></div>
            <div className="h-full w-32 bg-black"></div>
            <div className="h-full w-32 bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
