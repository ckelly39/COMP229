import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Logo from './components/logo';

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/about'));
const Contact = lazy(() => import('./components/contact'));
const Services = lazy(() => import('./components/services'));
const Project = lazy(() => import('./components/project'));

// Loading component
const LoadingFallback = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#666'
    }}>
        Loading...
    </div>
);

const MainRouter = () => {
    return (
        <div>
            <Layout />
            <Logo />
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/services" element={<Services />} />
                    <Route exact path="/project" element={<Project />} />
                    <Route exact path="/contact" element={<Contact />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default MainRouter;