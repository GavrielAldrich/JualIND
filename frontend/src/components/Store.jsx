import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Store_view from "./views/Store_view";
import api from "./axiosAPI";

export default function Store() {
  const { game } = useParams();
  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/games/${game}`);
        setGameData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [game]);

  const handleClick = (item) => {
    const { game_name, seller_username, id } = item;

    try {
      navigate(`../product/${game_name}/${seller_username}/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return !gameData ? (
    <h1>Loading...</h1>
  ) : (
    <Store_view gameData={gameData} handleClick={handleClick} />
  );
}
