import React from 'react';
import {Header} from "./Header";

export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className='container pt-5'>
            {children}
            </div>
        </>
    );
};

