import React, { useState } from 'react';

export default function Contact() {
    // Form state management
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        emailAddress: '',
        message: ''
    });
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            contactNumber: '',
            emailAddress: '',
            message: ''
        });
    };

    return (
        <div className="contact-panel">
            <h2 className="contact-heading">Contact Information</h2>
            
            {/* Contact details */}
            <div className="contact-details">
                <p><strong>Name:</strong> Kelly Cyusa</p>
                <p><strong>Email:</strong> ckelly39@my.centennialcollege.ca</p>
                <p><strong>Phone:</strong> (437) 609-5923</p>
                <p><strong>Address:</strong> 94 Paul Rouge, Toronto, ON</p>
            </div>
            
            {/* Social links */}
            <div className="social-links">
                <p><strong>Connect with me:</strong></p>
                <div className="social-links-container">
                    <a href="https://www.linkedin.com/in/kelly-cyusa">LinkedIn</a>
                    <a href="https://github.com/ckelly39">GitHub</a>
                </div>
            </div>
            
            {/* Contact form */}
            <div className="contact-form">
                <h3 className="form-heading">Send Me a Message</h3>
                <form onSubmit={handleSubmit}>
                    {/* Name inputs */}
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    {/* Contact number */}
                    <div className="form-field">
                        <label htmlFor="contactNumber">Contact Number</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* Email */}
                    <div className="form-field">
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Message */}
                    <div className="form-field">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                        />
                    </div>
                    
                    {/* Submit button */}
                    <button type="submit" className="submit-button">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}