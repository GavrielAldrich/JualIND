import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import Store_view from "./views/Store_view";
import api from "./axiosAPI";

export default function Store() {
  const { game } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/games/${game}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [game]);
  return <Store_view game = {game}/>;
}
