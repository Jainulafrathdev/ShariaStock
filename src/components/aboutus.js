// aboutus.js
import React, { useState } from 'react';
import './aboutus.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Userpic from '../images/user_dummy.jpg'; // Importing the user image
import { useLocation, useNavigate } from 'react-router-dom';




const AboutUs = () => {

  const location = useLocation();
  const [getEmail, setgetEmail] = useState(location.state);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleNewsletterSignup = () => {
    // Add logic to handle newsletter signup (e.g., sending the email to your backend)
    if (email) {
      alert(`Thank you for subscribing with the email: ${email}`);
      setEmail(''); // Clear the input after submission
    } else {
      alert('Please enter a valid email address.');
    }
  };
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <Typography
          variant="h4" // Changed to h4 for a smaller header size
          component="h1"
          sx={{ textAlign: 'top', color: '#f5f5f5', marginBottom: '8px',fontSize:'80px' }}
        >
          ABOUT US
        </Typography>
        <Typography
          variant="h6" // Changed to h6 for a smaller intro text size
          component="p"
          sx={{ textAlign: 'top', color: '#f5f5f5f',fontWeight:'bold' }}
        >
          LEARN, SCREEN AND INVEST IN HALAL STOCKS
        </Typography>
      </header>

      <section className="about-us-section">
        <Typography
          variant="h5" // Adjusted size for the "Our Mission" header
          component="h2"
          sx={{ marginBottom: '16px', textAlign: 'center', color: '#003366' }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1" // Added to ensure content is styled
          sx={{ textAlign: 'center', color: '#000', padding: '0 20px' }} // Center align content and added padding
        >
          Our mission is to provide innovative, Sharia-compliant financial tools that help investors make informed and responsible decisions.
        </Typography>
      </section>

      <section className="about-us-section">
        <Typography
          variant="h5" // Adjusted size for the "Our Values" header
          component="h2"
          sx={{ marginBottom: '16px', textAlign: 'center', color: '#003366' }}
        >
          Our Values
        </Typography>
        <ul className="about-us-values" style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
          <li style={{ padding: '0 20px' }}><strong>Integrity:</strong> Committed to reliable and transparent services.</li>
          <li style={{ padding: '0 20px' }}><strong>Transparency:</strong> Offering clear insights into ethical investment options.</li>
          <li style={{ padding: '0 20px' }}><strong>Community Empowerment:</strong> Supporting a financial path that aligns with values.</li>
        </ul>
      </section>

      <section className="about-us-section">
        <Typography
          variant="h5" // Adjusted size for the "Our Vision" header
          component="h2"
          sx={{ marginBottom: '16px', textAlign: 'center', color: '#003366' }}
        >
          Our Vision
        </Typography>
        <Typography
          variant="body1" // Body text style for clarity
          sx={{ textAlign: 'center', color: '#000', padding: '0 20px', marginBottom: '16px' }} // Center align content and added padding
        >
          Our vision is to be a leading provider of Sharia-compliant financial solutions that empower investors to make ethical decisions.
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: '#000', padding: '0 20px' }} // Center align content
        >
          We aim to foster an inclusive financial ecosystem that promotes sustainability and responsible investing.
        </Typography>
      </section>

      {/* Employee Image List */}
      <section className="employee-image-list" style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography
          variant="h5" // Adjusted size for the "Meet Our Team" header
          component="h2"
          sx={{ marginBottom: '16px', textAlign: 'center', color: '#003366' }}
        >
          Meet Our Team
        </Typography>
        <ImageList sx={{ width: '100%', height: 'auto', justifyContent: 'center',gap: 100}} cols={4} rowHeight={200}>
          {[...Array(8)].map((_, index) => ( // Adjusted to create 4 instances of the Userpic
            <ImageListItem key={index} sx={{ padding: '8px' }}>
              <img
                src={Userpic} // Using the imported user image
                alt={`Team Member ${index + 1}`} // Alternative text for accessibility
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Set to cover the entire item
              />
            </ImageListItem>
          ))}
        </ImageList>
      </section>
      
    </div>
  );
};

export default AboutUs;
