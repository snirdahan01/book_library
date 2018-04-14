import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItems = ({user}) => {

    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'fas fa-id-card',
            text: 'My Profile',
            link: '/user',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'fas fa-user-plus',
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'fas fa-sign-in',
            text: 'Login',
            link: '/login',
            restricted: false,
            exclude: true // if the user is login, it will now show "login" in the nav bar
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Reviews',
            link: '/user/user-reviews',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'far fa-file',
            text: 'Add Reviews',
            link: '/user/add',
            restricted: true
        },
        {
            type: 'navItem',
            icon: 'fas fa-sign-out',
            text: 'Logout',
            link: '/user/logout',
            restricted: true
        }
    ];

    //return template for nav bar items
    const element = (item,i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon}/>
                {item.text}
            </Link>
        </div>
    );

    //return items for nav bar if the user is login
    const showItems = () => (
        user.login ?
            items.map((item,i) => {
                if (user.login.isAuth) {
                    return !item.exclude ? //show only if "exclude" is false
                        element(item,i)
                    : null;
                } else {
                    return !item.restricted ?
                        element(item,i)
                    : null;
                }
            })
        : null
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SidenavItems);