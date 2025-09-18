import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/about';
import Contact from './components/contact';
import Services from './components/services';
import Project from './components/project';
import Layout from './components/layout';
import Logo from './components/logo';

const MainRouter = () => {
    return (
        <div>
            <Layout />
            <Logo />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/project" element={<Project />} />
                <Route exact path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
};

export default MainRouter;