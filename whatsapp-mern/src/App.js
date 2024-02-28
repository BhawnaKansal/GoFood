import React, { useEffect, useState } from 'react'
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Chatbox from './components/chat/Chatbox';
import Pusher from 'pusher-js'
import axios from './Axios'


function App() {
  const [messages,setMessages]=useState([])
  useEffect(()=>{
    axios.get('/messages/sync')
      .then(response=>{
        setMessages(response.data)
      })
  },[])



  useEffect(()=>{
    const pusher = new Pusher('5e71a8ce70a0f77718aa', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(data)=> {
      setMessages([...messages,data]);

    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe()
    }
  },[messages])

  console.log(messages)

  return (
    <div className="app">
      <div className='app_body'>
      <Sidebar />
      <Chatbox messages={messages} />
      </div>

    </div>
  );
}

export default App;
