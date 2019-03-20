import React, { Component } from 'react';
import axios from "axios"
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAvatar: ""
    }
  }
  componentDidMount() {
    axios.get("https://api.github.com/user/repos?access_token=d136a3243c9199ccc5e63f81cfb5212944f9044c")
    .then(res => this.setState({userAvatar: res.data[0].owner.avatar_url}))
  }

  render() {
    return (
      <div className="App">
        <img alt="" src={this.state.userAvatar}/>
      </div>
    );
  }
}

export default App;
