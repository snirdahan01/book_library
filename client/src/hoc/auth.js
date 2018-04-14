import React, { Component } from 'react';
import { auth } from '../actions';
import { connect } from 'react-redux';
import '../styles/loader.css';

//check if the user is authenticated
//if is, route him to Home page
//if not, kick him out
//ComposedClass is equal to the component we pass, a.e: Auth(home)
//reload: check the three senarios of logins
export default function(ComposedClass, reload){
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        /* wait until the user is authenticated and the props are getting */
        /* meanwhile show loading... */
        componentWillMount(){
            this.props.dispatch(auth());
        }

        componentWillReceiveProps(nextProps){
            this.setState({loading: false})

            //check if the user is authenticated
            if(!nextProps.user.login.isAuth){
                if(reload){
                    this.props.history.push('/login');
                }
            } else {
                if(reload === false){
                    this.props.history.push('/user');
                }
            }
        }

        render(){                                 
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return (
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
};