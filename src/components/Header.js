import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setApiKey, getUserRepos, setIssuesBool } from '../actions/githubActions'
import '../styles/header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(value) {
    return e => this.setState({[value]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.setIssuesBool(false)
    this.props.setApiKey(this.state.apiKey)
    localStorage.setItem("apiKey", this.state.apiKey)
    localStorage.setItem("repo", undefined)
    localStorage.setItem("userName", undefined)
    localStorage.setItem("issuesBool", false)
    this.props.getUserRepos(this.state.apiKey).then(() => this.setState({apiKey: ""}))
  }

  render() {
    window.props = this.props
    return(
      <div className="header-container">
        <div className="left-space-holder"></div>
        <div className="header-title">Github Manager</div>
        <form onSubmit={this.handleSubmit} className="api-key-form">
          <input className="api-key-input" onChange={this.handleChange("apiKey")} type="text" placeholder="Github api key" value={this.state.apiKey}/>
          <input className="api-key-submit" type="submit" value="Set Key"/>
        </form>
      </div>
    )
  }
}

Header.propTypes = {
  getUserRepos: PropTypes.func.isRequired,
  setApiKey: PropTypes.func.isRequired,
  setIssuesBool: PropTypes.func.isRequired
}

export default connect(null, {setApiKey, getUserRepos, setIssuesBool})(Header)
