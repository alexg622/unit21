import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import './App.css';
import home from "./components/Index"

class App extends Component {
  render() {
   return (
     <Provider store={ store }>
       <Router>
         <div className="App">
           <Route exact path="/" component={ home } />
         </div>
       </Router>
     </Provider>
   );
 }
}


export default App;
