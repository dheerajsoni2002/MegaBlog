import React from 'react'
import logo from '../assets/logo.png';


function Logo({width = '1100px'}) {
  return (
    <div >
      <img className='' src={logo} alt="" />
    </div>
  )
}

export default Logo