import React from 'react'
import {Link} from 'react-router-dom'

class Home extends React.Component {
    render() {
        return <React.Fragment>
            <div className="container">
                <br /><br /><br /><br /><br /><br />
                <Link to="/login"><button className="btn btn-warning btn-lg col-md-3 offset-md-1">Login</button></Link>
                <Link to="/register"><button className="btn btn-danger btn-lg col-md-3 offset-md-3">Register</button></Link>
            </div><br />
        </React.Fragment>
    }
}

export default Home
