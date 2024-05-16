import React, { useState, useEffect } from 'react';    
import { useNavigate } from 'react-router-dom';
import Form from './views/Form_view';
import api from './axiosAPI';

function Register() {
  const [userData, setUserData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/getSession");
        const isAuthenticated = response.data.authenticated;
        if (isAuthenticated) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/register", userData);
      const isRegistered = response.data.isRegistered;
      const successRegister = response.data.successRegister;
      if (isRegistered || successRegister) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Form
      formID="register"
      formTitle="Register"
      userData={userData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      submitButtonLabel="Register"
      additionalText="Already have an account?"
      additionalLink="/login"
      additionalLinkText="Login now!"
    />
  );
}

export default Register;
