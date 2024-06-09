import React from "react";

export default function Store({ gameData }) {
  console.log(gameData);
  return (
    <section id="store-container">
      {gameData.map((items) => {
        return (
          <button key={items.id} className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <p className="card-text">{items.item_title}</p>
              <h5 className="card-title">Rp {items.item_price}</h5>
            </div>
          </button>
        );
      })}
    </section>
  );
}
