import express from "express";
import session from "express-session";

import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import { db } from "./utils/db.js";
import limiter from "./utils/limiter.js";
import sessionStore from "./utils/store.js";
import auth from "./routes/auth_route.js";
import gameRouter from "./routes/games_route.js";
import indexRouter from "./routes/index_route.js";
import productRouter from "./routes/product_route.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, path.join(__dirname, '/public/files/'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

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

app.use(express.static('public'))
// app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index router
app.use("/", indexRouter);

// Route to Login, Register, Logout, Session
app.use("/api", auth);

// Route to find selected game
app.use("/api", gameRouter);

// Route to find selected product
app.use("/api", productRouter);

// POST A NEW ITEM
app.post("/api/sellItem", upload.single("item_image"), (req, res) => {
  const {
    game_name,
    seller_username,
    item_price,
    item_title,
    item_description,
  } = req.body;

  // Check if file is uploaded
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const file = req.file.filename; // Use filename here, not originalname

  db.query(
    "INSERT INTO game_items (game_name, seller_username, item_price, item_title, item_description, item_image) VALUES (?, ?, ?, ?, ?, ?)",
    [game_name, seller_username, item_price, item_title, item_description, file],
    (err, result) => {
      if (err) {
        console.log("Error while inserting item to database", err);
        return res.status(400).send("Error while inserting item to database");
      }
      res.status(200).send("Success adding new items!");
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
