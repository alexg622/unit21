import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import './App.css';
import Header from './components/Header'
import Repo from "./components/Index"
import Issue from "./components/Issue"
import {getUserRepos} from './actions/githubActions'

class App extends Component {
  render() {
   return (
     <Provider store={ store }>
       <Header />
       <Router>
         <div className="App">
           <Route exact path="/" component={ Repo } />
         </div>
       </Router>
     </Provider>
   );
 }
}


export default App;
