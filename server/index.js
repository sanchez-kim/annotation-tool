const cors = require("cors");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const app = express();

app.use(express.json());
app.use(cors());

// TODO: create user database
const users = [];

// Encrypt
const encrypt = (text, key, iv) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

// Decrypt
const decrypt = (text, key, iv) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(Buffer.from(text, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); // iv -> initialization vector

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  // later on
  // const encryptedUsername = encrypt(username, secretKey, iv);

  // Search for the user in the db
  const user = users.find(
    (u) => decrypt(u.username, secretKey, iv) === username
  );
  if (!user) {
    return res
      .status(400)
      .json({ sucess: false, message: "Invalid Username!" });
  }

  // Check the password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Password!" });
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

  return res.json({ success: true, token });
});

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const encryptedUsername = encrypt(username, secretKey, iv);

  // Create user
  const user = {
    id: users.length + 1,
    username: encryptedUsername,
    email,
    password: hashedPassword,
  };
  users.push(user);

  // Create a JWT token
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

  res.json({ success: true, token });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
