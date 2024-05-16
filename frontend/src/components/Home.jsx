import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axiosAPI'; // Import the Axios instance
import Home_view from './views/Home_view';

function Home() {
    const [isLoggedIn, setLogIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/api/getSession");
                const isAuthenticated = response.data.authenticated;
                if(isAuthenticated){
                    setLogIn(isAuthenticated);
                }else{
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await api.get("/api/logout");
            if (response.status === 200) {
                setLogIn(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (isLoggedIn ? 
    <Home_view handleLogout = {handleLogout} /> 
        : <h2>Loading Data...</h2>)
}

export default Home;
