import React, { useState } from 'react';
import { forgotPassword } from '../api/auth'; 
import '../App.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await forgotPassword({ email });
            setAlert({ type: 'success', message: res.data.msg });
            setEmail(''); 
        } catch (error) {
            setAlert({ type: 'error', message: error.response.data.msg });
        }
    };

    return (
        <div>
            <div className='header-section'>
                <h1>ShariaStock</h1>
            </div>
            <div className='form-container'>
                <h1>Forgot Password</h1>
                {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                <form onSubmit={onSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
            </div>
            
        </div>
    );
};

export default ForgotPassword;
