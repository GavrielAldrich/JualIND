import React, { useState, useEffect } from 'react';    
import { useNavigate } from 'react-router-dom';
import api from './axiosAPI';

function Register() {
  const [userData, setUserData] = useState({
    userEmail: '',
    userPassword: '',
  })
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get("/getSession");
            const isAuthenticated = response.data.authenticated;
            if(isAuthenticated){
                navigate("/")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usersDataUrl = 'http://localhost:5000/register';
    try {
      const response = await api.post(usersDataUrl, userData);
      if(response.data.isRegistered || response.data.successRegister){
        navigate('/login')
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } 
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setUserData(prevState => ({
      ...prevState,
      [name]: value // Update the corresponding field in userData based on name
    }));
  };
  
  
  // Render the login form
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name='userEmail'
            value={userData.userEmail}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name='userPassword'
            value={userData.userPassword}
            onChange={handleChange}
            required
          />
        </label>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
