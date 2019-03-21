import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getUserRepos, getIssues, setIssuesBool } from '../actions/githubActions'
import RepoCard from './RepoCard'
import "../styles/index.scss"

class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
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
      issues: []
    }
    this.handleIssues = this.handleIssues.bind(this)
  }

  componentDidMount() {
    // persist the state of the session with localStorage
    if (localStorage.apiKey !== "undefined" && localStorage.apiKey !== "") {
      this.props.getUserRepos(localStorage.apiKey)
      .then(res => {
        if(localStorage.repo !== "undefined" && localStorage.repo !== "") {
          this.props.setIssuesBool(Boolean(localStorage.getItem("issuesBool")))
          this.props.getIssues(localStorage.apiKey, localStorage.userName, localStorage.repo)
          .then(res => {
            this.setState({issues: this.props.issues})
            this.setState({repo: localStorage.repo})
          })
        }
      })
    }
  }

  handleCheckBoxes() {
    this.checkBoxTitle.style.background = "white"
    this.checkBoxCreated.style.background = "black"
    this.checkBoxUpdated.style.background = "white"
    this.checkBoxAssignee.style.background = "white"
  }

  // puts issues into state once a repository is clicked on
  handleIssues(e) {
    let classArr = e.target.classList
    let repo = classArr[1]
    let owner = classArr[2]
    this.setState({repo})
    localStorage.setItem("repo", repo)
    localStorage.setItem("userName", owner)
    this.props.getIssues(this.props.apiKey, owner, repo)
    .then(() => {
      this.props.setIssuesBool(true) // makes it so sessions and repos show not just repos
      localStorage.setItem("issuesBool", true) // for persisting state after refreshing the browser
      this.setState({issues: this.props.issues})
      this.handleCheckBoxes()
    })
  }

  // puts repos into the lower container
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
            handleIssues={this.handleIssues}
            ownerAvatar={ownerAvatar}
          />
        )
      }
    } else {
      return <div className="instructions">Enter your github auth token to view your repositories</div>
    }
    return result
  }

  // puts issues into the lower container
  showIssues(userData) {
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
        if(updatedAt.getMonth() === createdAt.getMonth() && updatedAt.getYear() === createdAt.getYear() && updatedAt.getDate() === createdAt.getDate()) {
          let hours = updatedAt.getHours() - createdAt.getHours()
          if(hours === 1) {
            updatedText = String(hours) + " hour ago from creation"
          } else {
            updatedText = String(hours) + " hours ago from creation"
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
            updatedText = "1 day ago from creation"
          } else {
            updatedText = String(days) + " days ago from creation"
          }
        }
        let title = userData[i].title
        let ownerAvatar = ""
        let assigneeName = ""
        if(userData[i].assignee === null) {
          ownerAvatar = "https://cdn2.iconfinder.com/data/icons/website-icons/512/User_Avatar-512.png"
          assigneeName = "No Assignee"
        } else {
          ownerAvatar = userData[i].assignee.avatar_url
          assigneeName = userData[i].assignee.login
        }
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

  // handles what is displayed when there are only repos
  showRepoDivs(userData) {
    return [
      <div key="repos" className="index-upper-container">Repositories</div>,
      <div key="repos-container"  className="index-lower-container">{this.showRepos(userData)}</div>
    ]
  }

  // handles what is displayed when there are repos and issues
  showIssuesDivs(userData, issues) {
    return [
      <div key="repos" className="index-upper-issues-container">
        <div className="center-width">Repositories</div>
        <div className="checkbox-outer-container">
          <div className="checkbox-container">
            <div ref = {checkBoxCreated => this.checkBoxCreated = checkBoxCreated} onClick={this.sortCreatedAt.bind(this)} className="checkbox checked"></div>
            <div className="category">Created</div>
          </div>
          <div className="checkbox-container">
            <div ref = {checkBoxUpdated => this.checkBoxUpdated = checkBoxUpdated} onClick={this.sortUpdatedAt.bind(this)} className="checkbox"></div>
            <div className="category">Updated</div>
          </div>
          <div className="checkbox-container">
            <div ref = {checkBoxTitle => this.checkBoxTitle = checkBoxTitle} onClick={this.sortTitle.bind(this)} className="checkbox"></div>
            <div className="category">Title</div>
          </div>
          <div className="checkbox-container">
            <div ref = {checkBoxAssignee => this.checkBoxAssignee = checkBoxAssignee} onClick={this.sortAssignee.bind(this)} className="checkbox"></div>
            <div className="category">Assignee</div>
          </div>
        </div>
        <div className="center-width">Issues for {this.state.repo}</div>
      </div>,
      <div key="issues" className="issues-repos-container">
        <div className="index-repos-lower-container">
          {this.showRepos(userData)}
        </div>
        <div className="index-issues-lower-container">
          {this.showIssues(issues)}
        </div>
      </div>
    ]
  }

  sortUpdatedAt(e) {
    let issues = this.mergeSort(this.props.issues, (a, b) => new Date(a.updated_at) > new Date(b.updated_at))
    this.setState({issues})
    this.checkBoxTitle.style.background = "white"
    this.checkBoxCreated.style.background = "white"
    this.checkBoxUpdated.style.background = "black"
    this.checkBoxAssignee.style.background = "white"
  }

  sortTitle(e) {
    let issues = this.mergeSort(this.props.issues, (a, b) => a.title < b.title)
    this.setState({issues})
    this.checkBoxTitle.style.background = "black"
    this.checkBoxCreated.style.background = "white"
    this.checkBoxUpdated.style.background = "white"
    this.checkBoxAssignee.style.background = "white"
  }

  sortCreatedAt(e) {
    let issues = this.props.issues
    this.setState({issues})
    this.checkBoxTitle.style.background = "white"
    this.checkBoxCreated.style.background = "black"
    this.checkBoxUpdated.style.background = "white"
    this.checkBoxAssignee.style.background = "white"
  }

  sortAssignee(e) {
    let issues = this.mergeSort(this.props.issues, (a, b) => {
      let assigneeA = ""
      let assigneeB = ""
      if (a.assignee === null) {
        assigneeA = "no assignee"
      } else {
        assigneeA = a.assignee.login
      }
      if (b.assignee === null) {
        assigneeB = "no assignee"
      } else {
        assigneeB = b.assignee.login
      }
      return assigneeA < assigneeB
    })
    this.setState({issues})
    this.checkBoxTitle.style.background = "white"
    this.checkBoxCreated.style.background = "white"
    this.checkBoxUpdated.style.background = "white"
    this.checkBoxAssignee.style.background = "black"
  }

  mergeSort (arr, callback) {
    function merge (left, right, callback) {
      let result = []
      let indexLeft = 0
      let indexRight = 0
      while (indexLeft < left.length && indexRight < right.length) {
        if (callback(left[indexLeft], right[indexRight])) {
          result.push(left[indexLeft])
          indexLeft++
        } else {
          result.push(right[indexRight])
          indexRight++
        }
      }
      return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
    }
    if (arr.length <= 1) {
      return arr
    }
    const middle = Math.floor(arr.length / 2)
    const left = arr.slice(0, middle)
    const right = arr.slice(middle)
    return merge(
      this.mergeSort(left, callback),
      this.mergeSort(right, callback),
      callback
    )
  }

  render(){
    let { userData } = this.props.userGitData
    let { issues } = this.state
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
