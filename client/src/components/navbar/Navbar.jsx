import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/auth';
import './Navbar.css'

class Navbar extends Component {

    handleLogout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        
        const userLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link font-weight-bold text-warning" to="/profile">PROFILE</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link font-weight-bold text-warning" href="null" onClick={this.handleLogout}>LOGOUT</a>
                </li>

            </ul>
        )

        const guestLink = (
            <ul className="navbar-nav ml-auto">
            
                <li className="nav-item">
                    <Link className="nav-link font-weight-bold text-warning" to="/signin">SIGNIN</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link font-weight-bold text-warning" to="/signin">SIGNUP</Link>
                </li>

            </ul>
        )
        
        
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">SoporteOnline</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                
                <div className="collapse navbar-collapse" id="basicExampleNav">

                   
                {localStorage.token ? userLink : guestLink}
                    
                </div>
                </nav>
        );
    }
}
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logout})(withRouter(Navbar));