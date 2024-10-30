import React, { useState } from 'react';
import './contactus.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        alert(result.message);  
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the message.');
    }
  };
  

  return (
    <div className="contact-page">
      <div className="left-section">
        <div className="text-container">
          <h1>We'd love to</h1>
          <h1>hear from you</h1>
        </div>
        <div className="circle-design"></div>
      </div>

      <div className="right-section">
        <h2>Contact us</h2>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className='contact-details'>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit →</button>
        </form>
        {/* After the form and submit button */}
        <div className="email-section">
          <p className="email-label">Email us</p>
          <p>enquiries@shariastock.com</p>
        </div>

        <div className="social-links">
          <a href="mailto:enquiries@shariastock.com" target="_blank" rel="noopener noreferrer">enquiries@shariastock.com</a>
          <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/yourusername" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
