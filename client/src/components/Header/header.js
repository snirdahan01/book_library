import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './Sidenav/sidenav';
import '../../styles/header.css';

class Header extends Component {

    state = {
        showNav: false
    }

    //hide the nav bar when click outside (if showNav is true: show the nav)
    onHideNav = () => {
        this.setState({showNav: false})
    }

    render() {
        return (
            <header>
                <div className="open_nav">
                    <FontAwesome 
                        name="bars"
                        className="bars"
                        onClick={() => this.setState({showNav: true})}
                    />
                </div>
                <Nav
                    showNav = {this.state.showNav}
                    onHideNav={() => this.onHideNav()}
                />
                <Link to="/" className="logo">
                    The Book Library
                </Link>
            </header>
        );
    }
}

export default Header;