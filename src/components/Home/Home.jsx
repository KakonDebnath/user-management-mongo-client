import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Header/>
            <Outlet />
        </div>
    );
};

export default Home;