import React from "react";

export default function Store_view({ gameData, handleClick }) {
  return (
    <section id="store-container">
      {gameData.map((item) => (
        <button
          key={item.id}
          className="card"
          onClick={() => handleClick(item)}
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <p className="card-text">{item.item_title}</p>
            <h5 className="card-title">Rp {item.item_price}</h5>
          </div>
        </button>
      ))}
    </section>
  );
}
