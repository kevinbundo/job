import React from 'react';
import Header from './Header';

const Layout = ({ children, location }) => {

    return (
        <>
            <Header location={location}/>
            {children}
        </>
    )

}

export default Layout
