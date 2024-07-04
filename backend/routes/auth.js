const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { generateToken, verifyToken } = require("../middleware/auth");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const router = express.Router();

// Function to load users from db.json
async function loadUsers() {
  try {
    const rawdata = await fs.readFile(dbPath);
    const data = JSON.parse(rawdata);
    return data.users || [];
  } catch (error) {
    console.error("Error reading users from db.json:", error);
    return [];
  }
}

// Function to save users back to db.json
async function saveUsers(users) {
  try {
    await fs.writeFile(dbPath, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error("Error saving users to db.json:", error);
  }
}

// Middleware to load users for each request
router.use(async (req, res, next) => {
  req.users = await loadUsers();
  next();
});

// Login route with PIN verification
router.post("/login", async (req, res) => {
  const { email, pin } = req.body;

  if (!email || !pin) {
    return res.status(400).json({ message: "Email and PIN are required" });
  }

  const user = req.users.find((u) => u.email === email);

  if (!user || !bcrypt.compareSync(pin, user.pin)) {
    return res.status(401).json({ message: "Invalid email or PIN" });
  }

  const token = generateToken(user);
  res.json({ token });
});

// Registration route
router.post("/register", async (req, res) => {
  const { email, idNumber, phoneNumber } = req.body;

  if (!email || !idNumber || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = req.users.find((u) => u.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }

  const newUser = {
    id: uuidv4(),
    email,
    idNumber,
    phoneNumber,
    availableAmount: 0,
    transactions: [],
  };

  req.users.push(newUser);
  await saveUsers(req.users);

  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser.id },
  });
});

// Example route to set a PIN for a user
router.patch("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ message: "PIN is required" });
  }

  const user = req.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);

    user.pin = hashedPin;
    await saveUsers(req.users);

    res.status(200).json({ message: "PIN set successfully" });
  } catch (error) {
    console.error("Error setting PIN:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Clear database route
router.post("/clear-db", async (req, res) => {
  try {
    await saveUsers([]); // Clears the users array
    res.status(200).json({ message: "Database cleared successfully" });
  } catch (error) {
    console.error("Error clearing database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile route - get user profile based on JWT token
router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.id;
  const user = req.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});

// Utility functions to read and write the database asynchronously
async function readDB() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the database:", error);
    return null;
  }
}

async function writeDB(data) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to the database:", error);
  }
}

// Top-up route
router.post("/topup", verifyToken, async (req, res) => {
  const { userId, amount, source } = req.body;

  if (!userId || !amount || !source) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber) || amountNumber <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const db = await readDB();
  if (!db) {
    return res.status(500).json({ message: "Could not read the database" });
  }

  const user = db.users.find((user) => user.id === userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.availableAmount = parseFloat(user.availableAmount) + amountNumber;
  user.transactions.push({
    id: `${user.transactions.length + 1}`,
    type: source,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
  });

  await writeDB(db);

  res.json({
    message: "Top up successful",
    user,
  });
});

//Withdraw route
router.post("/withdraw", verifyToken, async (req, res) => {
  const { userId, amount, source } = req.body;

  if (!userId || !amount || !source) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber) || amountNumber <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const db = await readDB();
  if (!db) {
    return res.status(500).json({ message: "Could not read the database" });
  }

  const user = db.users.find((user) => user.id === userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  user.availableAmount = parseFloat(user.availableAmount) - amountNumber;
  user.transactions.push({
    id: `${user.transactions.length + 1}`,
    type: source,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
  });

  await writeDB(db);

  res.json({
    message: "Top up successful",
    user,
  });
});

//Pay loan route
router.post("/pay", verifyToken, async (req, res) => {
  const { userId, amount, source, advanceId } = req.body;

  if (!userId || !amount || !source || !advanceId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber) || amountNumber <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const db = await readDB();
  if (!db) {
    return res.status(500).json({ message: "Could not read the database" });
  }

  const user = db.users.find((user) => user.id === userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const advance = user.salaryAdvances.find(
    (adv) => adv.advanceId === advanceId
  );
  if (!advance) {
    return res.status(400).json({ message: "Advance not found" });
  }

  if (amountNumber > advance.remainingAmount) {
    return res
      .status(400)
      .json({ message: "Repayment amount exceeds remaining advance amount" });
  }

  advance.remainingAmount -= amountNumber;
  advance.repayments.push({
    repaymentId: `${advance.repayments.length + 1}`,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
  });

  user.transactions.push({
    id: `${user.transactions.length + 1}`,
    type: source,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
  });

  await writeDB(db);

  res.json({
    message: "Repayment successful",
    user,
  });
});

module.exports = router;
