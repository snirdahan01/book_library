import React from 'react';
import Header from '../components/Header/header';

// High order component for the 
const Layout = (props) => {
    return (
        <div>
            <Header/>
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;