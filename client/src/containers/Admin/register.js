import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';
import '../../styles/register.css';
import '../../styles/user.css';

class Register extends PureComponent {

    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        error: ''
    }

    componentWillMount(){
        this.props.dispatch(getUsers()); //get all users
    }

    // update email input field
    handelInputEmail = (event) => {
        this.setState({email: event.target.value});
    }

    // update password input field
    handelInputPassword = (event) => {
        this.setState({password: event.target.value});
    }

    // update name input field
    handelInputName = (event) => {
        this.setState({name: event.target.value});
    }

    // update lastname input field
    handelInputLastname = (event) => {
        this.setState({lastname: event.target.value});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){ //if the user registration went wrong.
            this.setState({error: 'Error, try again!'});
        } else {
            this.setState({
                name: '',
                lastname: '',
                email: '',
                password: ''
            });
        }
    }

    submitForm = (e)=> {
        e.preventDefault();
        this.setState({error: ''}) //if we got an error before we register a new one we want to clear it

        this.props.dispatch(userRegister({ //dipatch register user
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            lastname: this.state.lastname
        }, this.props.user.users));
    }

    //show the users
    showUsers = (user) => (
        user.users ? // if there is a users
            user.users.map((item,i) => (
                <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr>
            ))
        : null
    )

    render() {          
        let user = this.props.user;      
        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Add user</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handelInputName}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter lastname"
                            value={this.state.lastname}
                            onChange={this.handelInputLastname}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handelInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.handelInputPassword}
                        />
                    </div>

                    <button type-="submit">Add user</button>
                    <div className="error">
                        {this.state.error}
                    </div>
                </form>
                <div className="current_users">
                    <h4>Current users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);