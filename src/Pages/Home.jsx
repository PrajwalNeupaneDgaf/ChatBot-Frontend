import React, { useState, useEffect, useRef } from 'react';
import Layout from '../Layout/Layout';
import Messages from '../Components/Messages';
import SendMessage from '../Components/SendMessage';

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [Chats, setChats] = useState([]);

  const messageRef = useRef(null);

  // Scroll to the bottom on page load and whenever Chats change
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [Chats]);

  return (
    <Layout>
      <div className="h-full px-3 py-2 flex flex-col">
        <div
          id="Message"
          ref={messageRef}
          className="h-[85%] lg:h-[80%] messages overflow-y-scroll"
        >
          <Messages
            Chats={Chats}
            setChats={setChats}
            Loading={Loading}
            setLoading={setLoading}
          />
        </div>
        <div className="h-[15%] lg:h-[20%] pt-3 flex justify-center items-center lg:pb-5 pb-1">
          <SendMessage
            Chats={Chats}
            setChats={setChats}
            Loading={Loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
