import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product_view } from "./views/Product_view";
import api from "./axiosAPI";

export default function Product() {
  const { game, seller, id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/product/${game}/${seller}/${id}`);
        setProduct(response.data.data[0]);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [game, seller, id]);
  
  
  return product ? <Product_view data={product} /> : <h1>Loading...</h1>;
}
