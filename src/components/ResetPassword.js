import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../api/auth'; 
import '../App.css'

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await resetPassword(token, { password });
            // Check if response data exists
            if (response && response.data) {
                setSuccess(response.data.message || 'Password reset successfully.');
                // Clear input fields
                setPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            // Handle error message
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <div className='header-section'>
                <h1>ShariaStock</h1>
            </div>
            <div className='form-container'>
                <h2>Reset Password</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
            
        </div>
    );
};

export default ResetPassword;
