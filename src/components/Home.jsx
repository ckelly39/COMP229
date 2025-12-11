import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to My Portfolio</h1>
            
            <div className="mission-statement">
                <h2>My Mission</h2>
                <p>
                    I strive to create innovative solutions that empower users to achieve their goals.
                    My commitment is to deliver excellence, foster creativity, and build a community of engaged users.
                </p>
            </div>

            {/* CI/CD Demo Update - December 10, 2025 */}
            <div style={{ 
                backgroundColor: '#f0f9ff', 
                padding: '20px', 
                borderRadius: '8px',
                margin: '20px 0',
                border: '2px solid #3b82f6'
            }}>
                <h3 style={{ color: '#1e40af' }}>🎉 Latest Update - CI/CD Demonstration</h3>
                <p>
                    This application features automated continuous deployment! 
                    Changes pushed to GitHub are automatically built and deployed to production.
                </p>
                <p style={{ fontSize: '0.9em', color: '#6b7280' }}>
                    <strong>Updated:</strong> December 10, 2025 | <strong>Feature:</strong> Automated CI/CD Pipeline
                </p>
            </div>
            
            <div className="navigation-buttons">
                <Link to="/about" className="nav-button">About Us</Link>
                <span> | </span>
                <Link to="/services" className="nav-button">Our Services</Link>
                <span> | </span>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>
        </div>
    );
}
