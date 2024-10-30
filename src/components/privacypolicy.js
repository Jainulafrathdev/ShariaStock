// privacypolicy.js
import React from 'react';
import './privacypolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-background" /> {/* Background image and overlay */}
      <div className="privacy-content">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-description">
          This Privacy Policy outlines how ShariaStock collects, uses, and protects your personal information. 
          Your privacy is very important to us, and we are committed to safeguarding your data.
        </p>

        <h2 className="privacy-subtitle">Information We Collect</h2>
        <p className="privacy-text">
          We collect information you provide when you register, log in, or update your profile on our platform.
          This may include your name, email address, and other relevant information needed for a personalized experience.
        </p>

        <h2 className="privacy-subtitle">How We Use Your Information</h2>
        <p className="privacy-text">
          Your information helps us improve our services, send notifications, and provide support. We also use 
          the data to analyze and enhance user experience on our platform.
        </p>

        <h2 className="privacy-subtitle">Data Security</h2>
        <p className="privacy-text">
          We implement secure protocols to protect your data from unauthorized access and breaches. Your information 
          is stored securely, and we regularly review our data protection measures.
        </p>

        <h2 className="privacy-subtitle">Your Rights</h2>
        <p className="privacy-text">
          You have the right to access, update, or delete your personal information at any time. For any privacy 
          concerns or requests, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
