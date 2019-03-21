import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getUserRepos, getIssues } from '../actions/githubActions'
import GreetUser from "./greetUser"
import "../styles/index.scss"

class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      avatarUrl: ""
    }
  }

  handleClick(owner, repo) {
    this.props.getIssues(this.props.userGitData.apiKey, owner, repo)
    .then(res => window.location.href="http://localhost:3000/issues")
  }

  showRepos(userData) {
    let result = []
    if(userData.length > 0) {
      for(let i=0; i<userData.length; i++) {
        let repoName = userData[i].name
        let ownerAvatar = userData[i].owner.avatar_url
        let ownerName = userData[i].owner.login
        let backgroundStyle = "white"
        if(i % 2 === 0) {
          backgroundStyle = "lightgray"
        }
        result.push(
          <div className="repo-div-container" style={{background: backgroundStyle}} key={i}>
            <div className="repo-div-placeholder"></div>
            <div className="repo-div-inner-container">
              <div className="owner-container">
                <img src={ownerAvatar} style={{height: "25px", width: "25px", borderRadius: "25px"}} alt=""/>
                <div className="owner-name">{ownerName}</div>
              </div>
              <div onClick={this.handleClick(ownerName, repoName)} className="repo-name">{repoName}</div>
            </div>
            <div className="repo-div-placeholder"></div>
          </div>
        )
      }
    } else {
      return <div className="instructions">Enter your github auth token to view your repositories</div>
    }
    return result
  }

  render(){
    let { userData } = this.props.userGitData
    return(
      <div className="index-container">
        <div className="index-inner-container">
          <div className="index-upper-container">
            Repositories
          </div>
          <div className="index-lower-container">
            {this.showRepos(userData)}
          </div>
        </div>
      </div>
    )
  }
}

Repo.propTypes = {
  getUserRepos: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {getUserRepos, getIssues})(Repo)
