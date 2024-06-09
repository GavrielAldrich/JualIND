import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import expressMySqlSession from "express-mysql-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { rateLimit } from "express-rate-limit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, "public", "index.html");

const MySQLStore = expressMySqlSession(session);
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to match your React app's URL
    credentials: true, // Allow cookies to be sent back and forth
  })
);

// Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jualind_db",
});

const sessionStore = new MySQLStore(
  {
    expiration: 1000 * 600, // 10 minutes
    endConnectionOnClose: false,
  },
  db
);

// Session
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
app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

app.get("/api/getBuyers", (req, res) => {
  db.query("SELECT * FROM users", (err, result, fields) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

app.get("/api/getSession", (req, res) => {
  if (!req.session) {
    console.log("Session is not found");
    res.status(400).json({ message: "Session is not found" });
    return;
  }
  res.status(200).json(req.session);
});

app.delete("/api/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log("Error destroying session");
      res.status(400).json({ message: "Error destroying session" });
      return;
    }
    console.log("Session destroyed successfully");
    res.status(200).json({ message: "Logout successful" });
  });
});

app.post("/api/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const lowerCasedEmail = userEmail.toLowerCase();
    const checkAvailEmail = await findUserData(lowerCasedEmail);
    if (!checkAvailEmail) {
      res.status(404).json({
        message: "User is not available / found, please Register",
        isLoggedIn: false,
      });
      return;
    }
    const storedHashedPassword = checkAvailEmail.password;
    bcrypt.compare(userPassword, storedHashedPassword, (err, result) => {
      if (err || !result) {
        console.log("Wrong password");
        res
          .status(400)
          .json({ message: "Wrong Password", authenticated: false });
        return;
      }

      req.session.authenticated = true;
      req.session.userEmail = checkAvailEmail.email;
      req.session.userID = checkAvailEmail.id;
      res
        .status(200)
        .json({ message: "Correct Password", authenticated: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const lowerCasedEmail = userEmail.toLowerCase();
    const checkAvailEmail = await findUserData(lowerCasedEmail);

    if (checkAvailEmail) {
      res.status(400).json({
        message: "Email is already in use, please log in",
        isRegistered: false,
      });
      return;
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [lowerCasedEmail, hashedPassword],
      (err, result) => {
        if (err) {
          console.log("There is error while registering to database");
          res.status(501).send("Internal Server Error");
          return;
        }
        res.status(200).send({
          message: "User Registered Successfully",
          successRegister: true,
        });
      }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

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
