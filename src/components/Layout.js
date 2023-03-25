import React from 'react';
import {Header} from "./Header";
import Footer from "./Footer";

export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className='container pt-5'>
            {children}
            </div>
            <Footer/>
        </>
    );
};

