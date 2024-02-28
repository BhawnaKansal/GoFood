import React from 'react'
import './Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Avatar, IconButton } from '@mui/material';
import SidebarChats from './SidebarChats';
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar_header">
        <div className="profile">
        <Avatar />
        </div>
        <div className="settings">
          <IconButton>
          <DonutLargeIcon />
          </IconButton>
          <IconButton>
          <ChatIcon />
          </IconButton>
          <IconButton>
          <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder='Search or start new chat'></input>
        </div>
      </div>
      <div className="sidebar_chats">
        <h2 >Add new chats</h2>
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
      </div>
    </div>
  )
}

export default Sidebar

