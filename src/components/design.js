import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import signup from '../images/Signup.png';
import investing from '../images/Halal investing.png';
import opportunities from '../images/opportunities.png';
import halalway from '../images/Halal way.png';
import portfolio from '../images/Portfolio.png';
import { Link } from 'react-router-dom';
import './design.css';
import logo from '../images/ShariaStock-logo.png'

export default function Design() {
  return (
    <div className='contents'>
      <div className='header'>
        <img src={logo} alt="ShariaStock Logo" className='header-logo' /> {/* Added logo here */}
        <div className='header-button'>
          <Link to="/login">
            <button className='login'>LOGIN</button>
          </Link>
          <Link to="/signup">
            <button className='signup'>SIGNUP</button>
          </Link>
        </div>
      </div>
      <br />

      <div className='carousel-container'>
        <Carousel
          showArrows={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          transitionTime={1000}
          showStatus={false}
        >
          <div>
            <img src={signup} alt="Sign Up" />
          </div>
          <div>
            <img src={investing} alt="Investing" />
          </div>
          <div>
            <img src={opportunities} alt="Opportunities" />
          </div>
          <div>
            <img src={halalway} alt="Halal Way" />
          </div>
          <div>
            <img src={portfolio} alt="Portfolio" />
          </div>
        </Carousel>
      </div>
      <div className='auth-container'>
        <div className='auth-components'>
          <p>Your Path to Halal Investing Starts Here</p>
          <Link to="/login">
            <button className='login'>LOGIN</button>
          </Link>
        </div>
        <div className='auth-components'>
          <p>Don't have an account, Join Us in Building a Financially Secure, Halal Future</p>
          <Link to="/signup">
            <button className='signup'>SIGNUP</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
