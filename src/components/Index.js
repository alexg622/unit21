import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRepos, getIssues, setIssuesBool } from '../actions/githubActions'
import RepoCard from './RepoCard'
import "../styles/index.scss"

class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      avatarUrl: "",
      repo: "",
      getNum: {
        "0": "01",
        "1": "02",
        "2": "03",
        "3": "04",
        "4": "05",
        "5": "06",
        "6": "07",
        "7": "08",
        "8": "09",
        "9": "10",
        "10": "11",
        "11": "12"
      },
      getDay: {
        "0": "Sun",
        "1": "Mon",
        "2": "Tue",
        "3": "Wed",
        "4": "Thu",
        "5": "Fri",
        "6": "Sat"
      },
      getMonth: {
        "0": "Jan",
        "1": "Feb",
        "2": "Mar",
        "3": "Apr",
        "4": "May",
        "5": "Jun",
        "6": "Jul",
        "7": "Aug",
        "8": "Sep",
        "9": "Oct",
        "10": "Nov",
        "11": "Dec"
      }
    }
    this.handleIssues = this.handleIssues.bind(this)
  }

  handleIssues(e) {
    let classArr = e.target.classList
    let repo = classArr[1]
    let owner = classArr[2]
    this.setState({repo})
    this.props.getIssues(this.props.apiKey, owner, repo)
    .then(() => this.props.setIssuesBool(true))
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
          <RepoCard
            i={i}
            key={i}
            repoName={repoName}
            ownerName={ownerName}
            backgroundStyle={backgroundStyle}
            handleIssues={this.handleIssues.bind(this)}
            ownerAvatar={ownerAvatar}
          />
        )
      }
    } else {
      return <div className="instructions">Enter your github auth token to view your repositories</div>
    }
    return result
  }

  showIssues(userData, manageWidth, issueDivWidth) {
    let result = []
    if(userData.length > 0) {
      for(let i=0; i<userData.length; i++) {
        let createdAt = new Date(userData[i].created_at)
        let createdMonth = this.state.getNum[createdAt.getMonth()]
        let createdYear = createdAt.getFullYear()
        let createdDate = 0
        if(createdAt.getDate() < 10) {
          createdDate = this.state.getNum[createdAt.getDate()]
        } else {
          createdDate = createdAt.getDate()
        }
        let updatedAt = new Date(userData[i].updated_at)
        let updatedText = ""
        window.updatedAt = updatedAt
        window.createdAt = createdAt
        if(updatedAt.getMonth() === createdAt.getMonth() && updatedAt.getYear() === createdAt.getYear() && updatedAt.getDate() === createdAt.getDate()) {
          let hours = updatedAt.getHours() - createdAt.getHours()
          if(hours === 1) {
            updatedText = String(hours) + " hour ago"
          } else {
            updatedText = String(hours) + " hours ago"
          }
        } else {
          let days = (updatedAt.getTime() - createdAt.getTime())
          days /= 1000
          days /= 60
          days /= 60
          days /= 24
          days = Math.floor(days)
          if(createdAt.getTime() === updatedAt.getTime()) {
            updatedText = "Never updated"
          } else if (days === 0) {
            updatedText = "1 day ago"
          } else {
            updatedText = String(days) + " days ago"
          }
        }
        let updatedDay = this.state.getDay[updatedAt.getDay()]
        let updatedYear = updatedAt.getFullYear()
        let updatedDate = updatedAt.getDate()
        let updatedMonth = this.state.getMonth[updatedAt.getMonth()]
        let title = userData[i].title
        let ownerAvatar = userData[i].assignee.avatar_url
        let assigneeName = userData[i].assignee.login
        let backgroundStyle = "white"
        if(i % 2 === 0) {
          backgroundStyle = "lightgray"
        }
        result.push(
          <div className="issue-div-container" style={{background: backgroundStyle}} key={i}>
            <div className="assignee-outer-container">
              <div className="assignee-container">
                <img src={ownerAvatar} style={{height: "40px", width: "40px", borderRadius: "25px"}} alt=""/>
                <div className="owner-name">{assigneeName}</div>
              </div>
              <div className={"issue-container issue-name " + title + " " + assigneeName}>
                <div className="issue-info"><div className="bold">Title:</div> {title}</div>
                <div className="issue-info"><div className="bold">Created:</div> {createdMonth + "/" + createdDate + "/" + createdYear}</div>
                <div className="issue-info"><div className="bold">Updated:</div>{updatedText}</div>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return <div className="instructions">No Issues :)</div>
    }
    return result
  }

  showRepoDivs(userData) {
    return [
      <div key="repos" className="index-upper-container">Repositories</div>,
      <div key="repos-container"  className="index-lower-container">{this.showRepos(userData)}</div>
    ]
  }

  showIssuesDivs(userData, issues) {
    return [
      <div key="repos" className="index-upper-issues-container">
        <div>Repositories</div>
        <div>Issues for {this.state.repo}</div>
      </div>,
      <div key="issues" className="issues-repos-container">
        <div className="index-repos-lower-container">
          {this.showRepos(userData)}
        </div>
        <div className="index-issues-lower-container">
          {this.showIssues(issues, "issues-div-placeholder", "issue-div-inner-container")}
        </div>
      </div>
    ]
  }

  render(){
    let { userData } = this.props.userGitData
    let { issues } = this.props
    return(
      <div className="index-container">
        <div className="index-inner-container">
          {this.props.issuesBool ? this.showIssuesDivs(userData, issues) : this.showRepoDivs(userData)}
        </div>
      </div>
    )
  }
}

Repo.propTypes = {
  getUserRepos: PropTypes.func.isRequired,
  setIssuesBool: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  userGitData: PropTypes.object.isRequired,
  apiKey: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
  issuesBool: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  window.state = state
  let values = {
    errors: state.errors,
    userGitData: state.userGitData,
    issuesBool: state.userGitData.issuesBool,
    apiKey: state.userGitData.apiKey,
    issues: state.userGitData.issues
  }
  return values
}

export default connect(mapStateToProps, {getUserRepos, setIssuesBool, getIssues})(Repo)
