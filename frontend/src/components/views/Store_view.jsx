import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header_view from "./Header_view";
import api from "../axiosAPI";

export default function Store() {
  const { game } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/games/${game}`);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [game]);

  return (
    <>
    <Header_view />
    <h1>Store for {game}</h1>
    </>
  );
}
