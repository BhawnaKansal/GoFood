import React from 'react'
import './SidebarChats.css'
import { Avatar } from '@mui/material'

function SidebarChats() {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className="info">
        <h3>Room Name</h3>
        <p>This is the last message</p>
      </div>
    </div>
  )
}

export default SidebarChats
