import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import './App.css';
import Header from './components/Header'
import Index from "./components/Index"

class App extends Component {
  render() {
   return (
     <Provider store={ store }>
       <Header />
       <Router>
         <div className="App">
           <Route exact path="/" component={ Index } />
         </div>
       </Router>
     </Provider>
   );
 }
}


export default App;
