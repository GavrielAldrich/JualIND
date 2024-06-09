import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Store_view from "./views/Store_view";
import api from "./axiosAPI";

export default function Store() {
  const { game } = useParams();
  const [gameData, setGameData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/games/${game}`);
        setGameData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [game]);

  return !gameData ? <h1>Loading...</h1> : <Store_view gameData={gameData.data} />;
}
