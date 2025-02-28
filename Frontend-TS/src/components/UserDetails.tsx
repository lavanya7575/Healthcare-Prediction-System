import { useState } from 'react';
import axios from 'axios';

const UserDetails = () => {

    const [formData, setFormData] = useState({
        uid: '', // Firebase UID (will be fetched from localStorage)
        name: '',
        email: '',
        phone: '',
        address: '',
        allergies: '',
        chronicConditions: '',
        medications: '',
        immunizations: '',
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get Firebase UID from localStorage
        const uid = localStorage.getItem('uid');
        console.log(uid);
        if (!uid) {
            alert('User not logged in. Please log in first.');
            return;
        }

        // Add UID to form data
        const dataToSend = { ...formData, uid };

        try {
            // Send data to backend
            const response = await axios.post('http://localhost:5003/api/user/details', dataToSend);
            console.log('User details saved:', response.data);
            alert('User details saved successfully!');
        } catch (error) {
            console.error('Error saving user details:', error);
            alert('Failed to save user details. Please try again.');
        }
    };

    return (
        <div>
            <h1>User Details Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Allergies:</label>
                    <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Chronic Conditions:</label>
                    <textarea
                        name="chronicConditions"
                        value={formData.chronicConditions}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Medications:</label>
                    <textarea
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Immunizations:</label>
                    <textarea
                        name="immunizations"
                        value={formData.immunizations}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Details</button>
            </form>
        </div>
    );
};

export default UserDetails;