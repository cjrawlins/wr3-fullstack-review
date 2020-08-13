import React from 'react';
import './reset.css';
import './App.css';
import './components/header.css';
import {Switch, Route} from 'react-router-dom'
// Hash Router imported in index.js and wraps <App />

//Components
import FrontPage from './components/FrontPage';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';

class App extends React.Component {
  render(){
    return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/front_page" component={FrontPage}/>
        <Route path="/profile" component={Profile}/>
      </Switch>

    </div>
    )
  }
}

export default App;
