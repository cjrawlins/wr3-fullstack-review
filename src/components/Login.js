import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../redux/reducer';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            newUser: false
        }
    }

    toggle = () => {
        this.setState( {
            newUser: !this.state.newUser
        } )
    }

    changeHandler = (e) => {
        this.setState( {
            [e.target.name]: e.target.value
        } )
    }
    
    login = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password}).then(res => {
            this.props.loginUser( res.data );
            this.props.history.push('/front_page');
        }).catch( err => {
            console.log(err)
            alert('Login Failed')
        } )
    }

    register = () => {
        const {email, password, firstName, lastName} = this.state;
        axios.post('/auth/register', {email, password, firstName, lastName}).then(res => {
            this.props.loginUser( res.data );
            this.props.history.push('/front_page')
        }).catch( err => {
            console.log(err)
            alert('Register Failed')
        } )
    }

    render() {
        const {email, password, firstName, lastName} = this.state;
    return (
        <div className="login">
            <div className="login-container">
                <h1>Welcome</h1>
                {!this.state.newUser ? 
                <div>
                    <input onChange={ e => this.changeHandler(e) } name="email" type="text" value={email} placeholder="Email" />
                    <input onChange={ e => this.changeHandler(e) } name="password" type="password" value={password} placeholder="Password" />
                    <div className="btn-container">
                        <button onClick={this.login}>Login</button>
                        <button onClick={() => this.toggle() }>Sign Up</button>
                    </div>
                </div>
                :
                <div>
                    <input onChange={ e => this.changeHandler(e) } name="firstName" type="text" value={firstName} placeholder="First Name" />
                    <input onChange={ e => this.changeHandler(e) } name="lastName" type="text" value={lastName} placeholder="Last Name" />
                    <input onChange={ e => this.changeHandler(e) } name="email" type="text" value={email} placeholder="Email" />
                    <input onChange={ e => this.changeHandler(e) } name="password" type="password" value={password} placeholder="Password" />
                    <div className="btn-container">
                        <button onClick={this.register}>Register</button>
                        <button onClick={() => this.toggle() }>I already have an account</button>
                    </div>
                </div>
                }

            </div>

        </div>
    )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {loginUser} )(Login);