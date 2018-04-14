import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';
import './../../styles/user.css';

class UserPosts extends Component {

    componentWillMount(){
        //get all the user posts
        this.props.dispatch(getUserPosts(this.props.user.login.id));
    }

    showUserPosts = (user) => (
        user.userPosts ?
            user.userPosts.map(item => (
                <tr key={item._id}>
                    <td><Link to={`/user/edit-post/${item._id}`}>
                        {item.title}
                    </Link></td>
                    <td>{item.author}</td>
                    <td>
                        {moment(item.createdAt).format("DD/MM/YY")}
                    </td>
                </tr>
            ))
        : null
    )

    render() {
        let user = this.props.user;
        
        return (
            <div className="user_posts">
               <h4>Your books:</h4>
               <h5 style={{color: 'red'}}>* Click the title to edit a book</h5>
               <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
               </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPosts);