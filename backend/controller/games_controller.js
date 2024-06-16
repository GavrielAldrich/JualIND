import { db } from "../utils/db.js";

export const selectedGames = (req, res) => {
  const findGame = req.params.selectedGame;
  db.query(
    "SELECT * FROM game_items WHERE game_name = ?",
    [findGame],
    (err, result) => {
      if (err) {
        console.error("Error finding game:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(200).send({
        message: "Game found.",
        data: result,
      });
    }
  );
};
