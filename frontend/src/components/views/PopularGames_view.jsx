import React from "react";
import { useNavigate } from 'react-router-dom';
import item_logo from "../../img/mlbb-image.png";

export default function PopularGames_view() {
  const navigate = useNavigate();

  const handleButtonClick = (game) => {
    navigate(`/store/${game}`);
  };

  return (
    <section id="most-popular-games">
      <div className="most-popular-title">
        <div className="skew-container">
          <h5>Popular Games</h5>
        </div>
      </div>

      <div id="most-popular-content">
        <button
          className="item"
          onClick={() => handleButtonClick("mobile_legend")}
        >
          <img src={item_logo} alt="" className="item-image" />
          <span className="item-title">Mobile Legend</span>
        </button>
        <button
          className="item"
          onClick={() => handleButtonClick("genshin_impact")}
        >
          <img src={item_logo} alt="" className="item-image" />
          <span className="item-title">Genshin Impact</span>
        </button>
        <button
          className="item"
          onClick={() => handleButtonClick("roblox")}
        >
          <img src={item_logo} alt="" className="item-image" />
          <span className="item-title">Roblox</span>
        </button>
        <button
          className="item"
          onClick={() => handleButtonClick("free_fire")}
        >
          <img src={item_logo} alt="" className="item-image" />
          <span className="item-title">Free Fire</span>
        </button>
        <button
          className="item"
          onClick={() => handleButtonClick("wuthering_waves")}
        >
          <img src={item_logo} alt="" className="item-image" />
          <span className="item-title">Wuthering Waves</span>
        </button>
      </div>
    </section>
  );
}
