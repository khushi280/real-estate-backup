import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
    return (
        <div>
            <Header />
            <div className='pt-16'> 
                <Outlet /> 
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
