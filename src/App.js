import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Design from './components/design';
import Profile from './components/profile';
import EditProfile from './components/editprofile';
import AboutUs from './components/aboutus';
import Legal from './components/legal';
import PrivacyPolicy from './components/privacypolicy';
import ContactUs from './components/contactus';
import StockDetail from './components/stockDetails';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Design />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/editprofile" element={<EditProfile />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/stock/:symbol" element={<StockDetail />} />
                    {/* <Route path="/editprofile" element={<EditProfile />} />
                    <Route path="/settings" element={<Settings />} /> */}
                  
                </Routes>
            </div>
        </Router>
    );
};

export default App;
