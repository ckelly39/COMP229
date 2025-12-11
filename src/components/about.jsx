import React from 'react';
import OptimizedImage from './OptimizedImage';

export default function About() {
    // Personal information
    const name = 'Kelly Cyusa';
    const profileSrc = '/profile.jpg'; // Path to profile image in public folder
    
    return (
        <section className="about-section">
            {/* Optimized profile image with lazy loading */}
            <OptimizedImage
                src={profileSrc}
                alt={`${name} profile`}
                className="profile-image"
                width="200"
                height="200"
                loading="lazy"
            />
            
            {/* Name heading */}
            <h1 className="profile-name">{name}</h1>
            
            {/* Bio */}
            <p className="bio">
                I'm a passionate software engineering student specializing in Artificial Intelligence. 
                My AI journey began at CIMT College, where I built a weather prediction prototype using 
                Python, NumPy, and Pandas. I've also had a brief telecom stint—seeing how technical 
                solutions meet real-world constraints. I'm driven by curiosity, disciplined learning, 
                and a goal to build useful, human-centered technology.
            </p>

            {/* Resume link */}
            <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
            >
                View PDF version
            </a>
        </section>
    );
}