import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import '../../styles/register.css';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        success: false
    }

    //target the email value from the input
    handelInputEmail = (event) => {
        this.setState({email:event.target.value})
    }

    //target the password value from the input
    handelInputPassword = (event) => {
        this.setState({password:event.target.value})
    }

    //get the ability to recieve the previous props and the next props
    //for evaluate the previous and the new state info
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.user.login.isAuth){ //check if the user is authenticated
            this.props.history.push('/user')
        }
    }

    submitForm = (e) => {
        e.preventDefault();   
        
        this.props.dispatch(loginUser(this.state)) //login user after submit form
    }

    render() {
        let user = this.props.user;

        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Log In Here</h2>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter your mail"
                            value={this.state.email}
                            onChange={this.handelInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handelInputPassword}
                        />
                    </div>

                    <button type="submit">Log in</button>
                    <div className="error">
                        {
                            user.login ?
                                <div>{user.login.message}</div>
                            : null
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){    
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);