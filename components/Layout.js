import React from 'react';
import Header from './Header';

const Layout = ({children}) => {
    
    return (
        <div
            className="h-screen"
        >
            <Header/>
            <div
                className='h-[calc(100vh-48px)] overflow-y-auto'
            >
                {children}
            </div>
        </div>
    );
};

export default Layout;