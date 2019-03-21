import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIssues } from '../actions/githubActions'
import "../styles/index.scss"

class Issue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repo: "",
      owner: ""
    }
  }

  componentDidMount() {
    let {repo, owner} = this.props.location.state
    this.setState({repo, owner}, () => {
      this.props.getIssues(this.props.userGitData.apiKey, this.state.owner, this.state.repo)
      .then(res => window.props = this.props)
    })
  }

  render(){
    let { userData } = this.props.userGitData
    return(
      <div className="index-container">
        <div className="index-inner-container">
          <div className="index-upper-container">
            Repository Issues
          </div>
          <div className="index-lower-container">

          </div>
        </div>
      </div>
    )
  }
}

Issue.propTypes = {
  getIssues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  userGitData: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  let values = {
    errors: state.errors,
    userGitData: state.userGitData
  }
  return values
}

export default connect(mapStateToProps, {getIssues})(Issue)
