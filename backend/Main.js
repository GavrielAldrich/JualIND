import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { rateLimit } from "express-rate-limit";
import { userLogin, userLogout, userRegister } from "./routes/auth.js";
import { sessionStore } from "./utils/store.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, "public", "index.html");

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

// GET SESSION
app.get("/api/getSession", (req, res) => {
  if (!req.session) {
    console.log("Session is not found");
    res.status(400).json({ message: "Session is not found" });
    return;
  }
  res.status(200).json(req.session);
});

// POST REGISTER
app.post("/api/register", userRegister);

// POST LOGIN
app.post("/api/login", userLogin);

// DELETE LOGOUT / SESSION
app.delete("/api/logout", userLogout);

// GET SELECTED GAMES
app.get("/api/games/:selectedGame", (req, res) => {
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
});

// GET SELECTED PRODUCT
app.get("/api/product/:game/:seller/:id", (req, res) => {
  const { game, seller, id } = req.params;
  try {
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

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

// FUNCTION AREA
async function findUserData(email) {
  return await new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.error("Error finding user data:", err);
        reject(err);
        return;
      }
      if (result.length > 0) {
        console.log("User data found.");
        resolve(result[0]);
      } else {
        console.log("User data not found.");
        resolve(null);
      }
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
