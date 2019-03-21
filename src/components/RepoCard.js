import React from 'react';

const RepoCard = (props) => {
  const {repoName, i, backgroundStyle, ownerName, ownerAvatar, handleIssues} = props
  return (
    <div className="repo-div-container" style={{background: backgroundStyle}} key={i}>
      <div className="repo-div-inner-container">
        <div className="owner-container">
          <img src={ownerAvatar} style={{height: "40px", width: "40px", borderRadius: "25px"}} alt=""/>
          <div className="owner-name">{ownerName}</div>
        </div>
        <div className={"repo-name " + repoName + " " + ownerName} onClick={handleIssues}>{repoName}</div>
      </div>
    </div>
  )
}

export default RepoCard
