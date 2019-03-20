import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getUserRepos } from '../actions/githubActions'

class Index extends Component {
  componentDidMount() {
    this.props.getUserRepos("ddfbbf6780bf56e06381a05c0bbdeba9b6094dd2")
  }
  render(){
    return(
      <div>
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
