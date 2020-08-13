import React, { Component } from 'react';
import axios from 'axios';
import "./header.css";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {logoutUser, getUser} from '../redux/reducer';


class Header extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    logout = () => {
        axios.get('/auth/logout').then( res => {
            this.props.logoutUser();
            this.props.history.push('/');
        } ).catch( err => console.log(err))
    }

    render() {
    return <header>
        <div className='logo-container'>
            <img alt='logo' src="https://www.clipartmax.com/png/middle/101-1015647_i-made-yall-a-snoo-reddit-logo-png.png" className='logo'/>
        </div>
        {this.props.isLoggedIn
        ?
        <h1>Welcome, {this.props.user.firstName} {this.props.user.lastName}</h1>
        :<h1>Schmeddit</h1>}
            <nav className='navigation'>
                <ul>
                    <Link to="/profile"><li>Profile</li></Link>
                    <Link to="/front_page"><li>Front Page</li></Link>
                    <Link onClick={this.logout} to="/"><li>Logout</li></Link>
                </ul>
            </nav>
    </header>
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {logoutUser, getUser})(Header);