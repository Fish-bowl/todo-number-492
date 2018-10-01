import React from 'react';
import axios from 'axios'
import Todo from './Todo'
import NavBar from './NavBar';
import Home from './Home'


class App extends React.Component {
  render() {
    return(
      <div>
        <Home/>
        <NavBar/>
        <Todo/>
      </div>
    )
  }
}

export default App
