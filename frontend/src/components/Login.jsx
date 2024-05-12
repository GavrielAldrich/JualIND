import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axiosAPI'; // Import the Axios instance

function Login() {
  const [userData, setUserData] = useState({
    userEmail: '',
    userPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getSession");
        const isAuthenticated = response.data.authenticated
        if(isAuthenticated){
          navigate("/");
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      };
    };

    // Run the Function, else it'll throw err.
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", userData); // Use the Axios instance for API requests
      if(response.data.verified){
        navigate("/");
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } 
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Render the login form
  return (
    <div>
      <h2>Login</h2>
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
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
