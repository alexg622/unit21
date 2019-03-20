import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getUserRepos } from '../actions/githubActions'
import GreetUser from "./greetUser"

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      avatarUrl: ""
    }
  }
  componentDidMount() {
    this.props.getUserRepos("1637488f5ada733560be8ee951ecbbdf48bb1879")
    .then(res => {
      if(res.data) {
        this.setState({userName: res.data[0].owner.login, avatarUrl: res.data[0].owner.avatar_url})
      }
    })
  }
  render(){
    return(
      <div>
        <GreetUser userName="Hi Alex" avatarUrl=""/>
      </div>
    )
  }
}

Index.propTypes = {
  getUserRepos: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  userGitData: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  window.state = state
  let values = {
    errors: state.errors,
    userGitData: state.userGitData
  }
  return values
}

export default connect(mapStateToProps, {getUserRepos})(Index)
