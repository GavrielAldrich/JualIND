import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";

import { db } from "./utils/db.js";
import limiter from "./utils/limiter.js";
import sessionStore from "./utils/store.js";
import auth from "./routes/auth_route.js"
import gameRouter from "./routes/games_route.js"
import indexRouter from "./routes/index_route.js"
import productRouter from "./routes/product_route.js"

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to match your React app's URL
    credentials: true, // Allow cookies to be sent back and forth
  })
);

app.use(
  session({
    secret: "TOPSECRETWORD",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 600, // 10 minutes
    },
  })
);

// app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index router
app.use("/", indexRouter);

// Route of Login, Register, Logout, Session
app.use("/api", auth)

// Route to find selected game
app.use("/api", gameRouter);

// Route to find selected product
app.use("/api", productRouter)

// POST A NEW ITEM
app.post("/api/sellItem", (req, res) => {
  const {
    game_name,
    seller_username,
    item_price,
    item_title,
    item_description,
  } = req.body;

  db.query(
    "INSERT INTO game_items (game_name, seller_username, item_price, item_title, item_description) VALUES (?, ?, ?, ?, ?)",
    [game_name, seller_username, item_price, item_title, item_description],
    (err, result) => {
      if (err) {
        console.log("Error while inserting item to database", err);
        res.status(400).send("Error while inserting item to database");
        return;
      }
      res.status(200).send("Success inserting item into database");
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
