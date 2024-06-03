import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form_view from './views/Form_view';
import api from './axiosAPI';

export default function Login({ setLogIn }) {
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    event.preventDefault();
    try {
      const response = await api.post("/api/login", userData);
      const isAuthenticated = response.data.authenticated;
      if (isAuthenticated) {
        setLogIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false)
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
    <Form_view
      formID="login"
      formTitle="Login"
      userData={userData}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      submitButtonLabel="Login"
      additionalText="Doesn't have an account?"
      additionalLink="/register"
      additionalLinkText="Register now!"
    />
  );
}
