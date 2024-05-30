import React, {useState, useEffect} from "react";

import axios from 'axios';

function Test() {
  // State to store data fetched from API
  const [data, setData] = useState(null);

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Function to fetch data using axios
    const fetchData = async () => {
      try {
        // Make GET request to API endpoint
        const response = await axios.get('https://api.sampleapis.com/wines/reds');
        // Set data in state
        setData(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Render data
  return (
    <div>
      <h1>My Component</h1>
      {data ? (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Test;