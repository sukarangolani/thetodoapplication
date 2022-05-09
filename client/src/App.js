import React from 'react';
import {Link,Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Home from './Home'
import Todo from './Todo'
import Register from './Register';
import Login from './Login';

class App extends React.Component {
  render() {
    return <Router>
      <div style={{
        background: `url(${'./back.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}>
        <Link to="/" style={{textDecoration:'none'}}><h1 className="display-4 text-white text-center zoom">ToDo Application</h1></Link>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/todo" component={Todo} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
        </Switch>
        <div style={{ height: "500px" }}></div>
      </div>
    </Router>
  }
}

export default App;
