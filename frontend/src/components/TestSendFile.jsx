import React, { useState } from "react";
import api from "./axiosAPI";

export default function TestSendFile() {
  const [sellerData, setSellerData] = useState({
    game_name: '',
    seller_username: '',
    item_price: '',
    item_title: '',
    item_description: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setSellerData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const key in sellerData) {
        formData.append(key, sellerData[key]);
      }
      await api.post("/api/games/mobile-legend", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form data submitted successfully");
    } catch (error) {
      console.error("There was an error submitting the form data!", error);
    }
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <p>Game Name</p>
      <input type="text" name="game_name" id="" onChange={handleChange} />

      <p>Seller Username</p>
      <input type="text" name="seller_username" id="" onChange={handleChange} />

      <p>Item Price</p>
      <input type="text" name="item_price" id="" onChange={handleChange} />

      <p>Item Title</p>
      <input type="text" name="item_title" id="" onChange={handleChange} />

      <p>Item Description</p>
      <input type="text" name="item_description" id="" onChange={handleChange} />

      <input type="submit" />
    </form>
  );
}
