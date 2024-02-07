import React from 'react';
import { useSelector } from "react-redux";
import Header from './Header';

const Layout = ({children}) => {
    const user = useSelector(state => state.auth.user)
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