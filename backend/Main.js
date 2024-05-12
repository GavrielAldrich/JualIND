import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from 'cors';

import session from "express-session";
import expressMySqlSession from "express-mysql-session";

import path, { dirname } from "path"
import { fileURLToPath } from 'url';

import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, 'public', 'index.html');

const MySQLStore = expressMySqlSession(session);
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your React app's URL
    credentials: true // Allow cookies to be sent back and forth
  }));

// Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jualind_db'
});

const sessionStore = new MySQLStore({
    expiration: (1000 * 600), // 10 minutes
    endConnectionOnClose: false
}, db); 

app.use(
    session({
      secret: "TOPSECRETWORD",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 600 // 10 minutes
      }
    })
  );

app.get('/', (req, res)=>{
    res.sendFile(indexPath);
});

app.get('/getBuyers', (req, res) => {
    db.query("SELECT * FROM users", (err, result, fields) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(result);
    });
});

app.get('/getSession', async (req, res) => {
    try {
        if(!req.session){
            req.session = false
        } else {
            res.json(req.session)
        }
    } catch (error) {
        console.log(error)
    }
});

app.get('/logout', async (req, res) => {
    try {
        req.session.destroy(function (err) {
            if (err) {
                console.error("Error destroying session:", err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                console.log("Session destroyed successfully");
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;
    const lowerCasedEmail = userEmail.toLowerCase();
    try {
      const checkAvailEmail = await findUserData(lowerCasedEmail);
      if (checkAvailEmail) {
        const storedHashedPassword = checkAvailEmail.password;
        if(req.session.authenticated){
            res.json(req.session)
        }else{
            bcrypt.compare(userPassword, storedHashedPassword, (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ message: 'Internal Server Error' });
                } else {
                  if (result) {
                    req.session.authenticated = true
                    req.session.userEmail = checkAvailEmail.email
                    req.session.userID = checkAvailEmail.id
                    res.status(201).json({ message: 'Correct Password', verified: result});
                  } else {
                    console.log("Wrong password");
                    res.status(200).json({ message: 'Wrong Password', verified: false });
                  }
                }
              });
        }
      } else {
        res.status(200).json({ message: 'User is not available / found, please Register', isLoggedIn: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.post('/register', async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const lowerCasedEmail = userEmail.toLowerCase();
        const checkAvailEmail = await findUserData(lowerCasedEmail);

        if (checkAvailEmail) {
            console.log("Register fail, user is already registered")
            res.status(200).json({ message: 'Email is already in use, please log in', isRegistered: true});
        } else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(userPassword, salt);

            db.query("INSERT INTO users (email, password) VALUES (?, ?)", [lowerCasedEmail, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user into database:', err);
                    return res.status(500).send('Internal Server Error');
                }
                res.status(200).send({ message: 'User Registered Succesfully', successRegister:true});
            });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function findUserData(data){
    return await new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ?", [data], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log("User Data is found")
                resolve(result[0]);
            }
        })
    });
}

// async function findSession(data){
//     return await new Promise((resolve, reject)=>{
//         db.query("SELECT * FROM sessions WHERE data = ? ")
//     })
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});