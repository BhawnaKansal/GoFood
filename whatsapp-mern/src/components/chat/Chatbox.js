import React,{useState} from 'react'
import './Chatbox.css'
import { Avatar, IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import axios from '../../Axios';
function Chatbox({messages}) {
  const sendMessage = async (e) =>{
    e.preventDefault();
    await axios.post('/messages/new',{
      name:"Demo App",
      message:input,
      timestamp:"Just Now!",
      received:false
    } )

    setInput('');
  }
  const [input,setInput]=useState('')
  
  return (
    <div className='chat'>
      <div className="chats_header">
        <Avatar />
        <div className="header_profile">
          <h3>Room Name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chats_headerRight">
          <IconButton>
          <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
          <AttachFileIcon />
          </IconButton>
          <IconButton>
          <MoreVertIcon />
          </IconButton>
        </div>
      </div>


      <div className="chatBody">
      {messages.map((messages)=>
      <p className={`chat_message ${messages.received && "chat_reciever"}`}>
      <span className='chatName'>
      {messages.name}
      </span>
      {messages.message}
      <span className="chatTime">{messages.timestamp}</span>
      </p>
      )}
        
        
      </div>
      <div className="chatFooter">
      <SentimentSatisfiedOutlinedIcon />
      <form action="">
        <input value={input} onChange={(e)=>{
          setInput(e.target.value)
        }} placeholder='Type a message' type='text'/>
        <button onClick={sendMessage} type='submit'>Send a message</button>
      </form>
      <KeyboardVoiceIcon />
      </div>
    </div>
  )
}

export default Chatbox
