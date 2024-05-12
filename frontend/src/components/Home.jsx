import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axiosAPI'; // Import the Axios instance

function Home() {
    const [isLoggedIn, setLogIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/getSession");
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
    }, []);

    const handleLogout = async () => {
        try {
            const response = await api.get("/logout");
            if (response.status === 200) {
                setLogIn(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const userData = (
        <>
            <h2>Welcome</h2>
            <form onSubmit={handleLogout}>
                <button type='submit'>Logout</button>
            </form>
        </>
    );

    const noData = (
        <h2>Loading Data...</h2>
    );

    return isLoggedIn ? userData : noData;
}

export default Home;
