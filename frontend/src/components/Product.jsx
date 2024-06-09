import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const itemsData = Object.entries(useParams());
  useEffect(() => {
  });
  return <h1>Product Page</h1>;
}
