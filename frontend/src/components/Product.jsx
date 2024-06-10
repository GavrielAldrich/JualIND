import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "./axiosAPI";

export default function Product() {
  const { game, seller, id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/product/${game}/${seller}/${id}`);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData()
  }, [game, seller, id]);
  return <h1>Product Page</h1>;
}
