import React, { useState, useEffect } from 'react';
import { getUserData, updateUserData, uploadProfilePicture } from '../api/auth';
import { Link } from 'react-router-dom';
import './editprofile.css'

const EditProfile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        doorNumber: '',
        streetName: '',
        city: '',
        country: '',
        pincode: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null); // Initialize with null

    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchUserData = async () => {
            if (email) {
                const userData = await getUserData(email);
                setUser(userData);
                setFormData({
                    name: userData.name,
                    contactNumber: userData.contactNumber || '',
                    doorNumber: userData.doorNumber || '',
                    streetName: userData.streetName || '',
                    city: userData.city || '',
                    country: userData.country || '',
                    pincode: userData.pincode || ''
                });
                setProfilePicture(userData.profilePicture || '');
                setProfilePreview(`http://54.174.221.90:5000/${userData.profilePicture}`); // Set initial preview
            }
        };
        fetchUserData();
    }, [email]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setProfilePreview(`http://54.174.221.90:5000/${user.profilePicture}`); // Reset to current profile picture on cancel
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setProfilePreview(URL.createObjectURL(file)); // Generate preview URL for new image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserData(email, formData);
        if (profilePicture) {
            const data = new FormData();
            data.append('profilePicture', profilePicture);
            data.append('email', email);
            await uploadProfilePicture(data);
        }
        setIsEditing(false);
        const updatedUserData = await getUserData(email);
        setUser(updatedUserData);
        setProfilePreview(`http://54.174.221.90:5000/${updatedUserData.profilePicture}`); // Update preview after save
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="header-icons">
                    <i className="fas fa-list" onClick={toggleSidebar}></i>
                    <div className="logo">ShariaStock</div>
                </div>

                <div className="user-icon" onClick={toggleDropdown}>
                    <img src={`http://54.174.221.90/${user.profilePicture}`} alt="Profile" className="profile-pic" />
                    <div className="user-info">
                        <p>{user.name}</p>
                    </div>
                </div>
            </nav>

            {isDropdownOpen && (
                <div className="profile-dropdown">
                    <div className="profile-section">
                        <img src={`http://54.174.221.90:5000/${user.profilePicture}`} alt="Profile" className="dropdown-profile-pic" />
                        <div className="profile-info">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                        <button className="premium-btn">Go Premium</button>
                    </div>
                    <div className="edit-profile">
                        <Link to="/editprofile">Edit Profile</Link>
                    </div>
                    <div className="setting">
                        <Link to="/settings">Settings</Link>
                    </div>
                    <button className="logout-btn">Logout</button>
                </div>
            )}

            {isSidebarOpen && (
                <div className="sidebar">
                    <ul className="sidebar-links">
                        <li><i className="fas fa-tachometer-alt"></i> Dashboard</li>
                        <li><i className="fas fa-eye"></i> Watchlist</li>
                        <li><i className="fas fa-briefcase"></i> Portfolio</li>
                    </ul>
                    <div className="market-overview">
                        <h4>Market Overview</h4>
                        <p>NSE <span className="red">25,0625</span></p>
                        <p>BSE <span className="green">25,0545</span></p>
                    </div>
                </div>
            )}

            
            <h2>Profile</h2>
            {!isEditing ? (
                <div className='display-info'>
                    
                    <div className='image-editbtn'>
                        <img src={profilePreview} alt="Profile" width={100} height={100} />
                        <button onClick={handleEditClick}>Edit</button>
                    </div>
                    <div className='info'>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Contact Number:</strong> {user.contactNumber}</p>
                    </div>
                    <div className='address-section'>
                        <div className='address-title'>
                        <p><strong>Address:</strong></p>
                        </div>
                        <div className='address-info'>
                            <p>{user.doorNumber}, {user.streetName}</p>
                            <p>{user.city}, {user.country} - {user.pincode}</p>
                        </div>
                        
                    
                    </div>
                    
                </div>
            ) : (
                
                <form className='edit-profile' onSubmit={handleSubmit}>
                    <div className='image-component'>
                    <h3>Profile Picture</h3>
                    <div className='image-section'>
                        
                        {profilePreview && <img src={profilePreview} alt="Profile Preview" width={100} height={100} />}
                        
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    </div>
                    
                    <div className='details'>
                        <h3>Name</h3>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                        <h3>Contact Number</h3>
                        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" />
                    </div>
                    <div className='Address-section'>
                        <h4>Address</h4>
                        <h3>Door Number</h3>
                        <input type="text" name="doorNumber" value={formData.doorNumber} onChange={handleChange} placeholder="Door Number" />
                        <h3>Street Name</h3>
                        <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} placeholder="Street Name" />
                        <div className='Region-section'>
                            <div className='city'>
                            <h3>City</h3>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                            </div>
                            <div>
                            <h3>Country</h3>
                            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
                            </div>
                            
                        </div>
                        
                        
                        <div className='handle-section'>
                            <div>
                            <h3>Pincode</h3>
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
                            </div>
                            
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCancelClick}>Cancel</button>
                        </div>
                       
                    </div>
                    
                </form>
            )}
        </div>
    );
};

export default EditProfile;