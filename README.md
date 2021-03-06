# Unit21

## About

After cloning the repo to run this application first type "npm install" into your terminal and then "npm start". To run it's tests you can type "npm test" into your terminal. After starting the application you will want to get a [Github api key](https://github.com/settings/tokens). Once you have the api key you can paste it into the form in the header to view your repositories. I thought it would be better to have a form to set your api key so that a user can change their repositories without having to restart the application. A user can click on a repository to view it's issues, and then sort the issues by when it was created, updated, the title, or the owner. I handled sorting with mergeSort and a callback function. I persist the state of the session through localStorage. So if you are looking at the repositories and issues, if you refresh the page you will still be looking at the repositories and issues. With more time I would have also persisted the state of the sorting category selected for issues using localStorage. I made a RepoCard component to demonstrate reusable code. With more time I would have utilized more reusable code such as an IssuesCard component. I also made a simple snapshot test with jest and enzyme checking to make sure that the header says Github Manager. With more time I would have definitely made more tests.

One problem that I ran into is that the application sorts the issues by when it was last updated in relation to its creation date, not its most recent update date. To fix this I would need a backend to keep track of its update dates and then compare the new update date with the old one.

## Images

![](https://github.com/alexg622/unit21/blob/master/images/Screen%20Shot%202019-03-21%20at%2011.07.20%20AM.png?raw=true)

![](https://github.com/alexg622/unit21/blob/master/images/Screen%20Shot%202019-03-21%20at%2011.07.38%20AM.png?raw=true)

![](https://github.com/alexg622/unit21/blob/master/images/Screen%20Shot%202019-03-21%20at%2011.07.51%20AM.png?raw=true)
