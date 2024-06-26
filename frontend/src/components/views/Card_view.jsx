import React from "react";

const Card_view = ({ data }) => {
  try {
    const { item_title, item_price, item_image } = data;

    return (
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={`http://localhost:5000/files/${item_image}`}
          alt={item_title}
        />
        <div className="card-body">
          <h5 className="card-title">Rp {item_price}</h5>
          <p className="card-text">{item_title}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Card_view component:", error);
    return null;
  }
};

export default Card_view;
