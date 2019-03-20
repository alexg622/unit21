import React, { Component } from 'react';

const GreetUser = (props) => {
  return (
    <div className="greetings-container">
      <div className="greeting">Hi {props.userName}</div>
      <img className="user-avatar" src={props.avatarUrl} alt=""/>
    </div>
  )
}

export default GreetUser
