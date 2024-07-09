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
    profilePictureUrl: "https://example.com/profile.jpg",
    availableAmount: 0,
    savings: 0,
    eligibleAdvance: 15000,
    borrowedAmount: 0,
    availableCredit: 0,
    availableAmount: 0,
    transactions: [],
    salaryAdvances: [
      {
        advanceId: "1",
        amount: 5000,
        dueDate: "2024-08-01",
        remainingAmount: 5000,
        borrowedAmount: 0,
        requests: [],
      },
    ],
    savingsGoals: [],
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
router.get("/profile/:userId", verifyToken, (req, res) => {
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

  if (amountNumber > advance.borrowedAmount) {
    return res
      .status(400)
      .json({ message: "Repayment amount exceeds borrowed advance amount" });
  }

  advance.remainingAmount += amountNumber;
  advance.borrowedAmount -= amountNumber;
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

//Request loan route
router.post("/request", verifyToken, async (req, res) => {
  const { userId, amount, date, advanceId } = req.body;

  if (!userId || !amount || !date || !advanceId) {
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

  if (amountNumber > advance.amount) {
    return res
      .status(400)
      .json({ message: "Requested amount exceeds Approved advance amount" });
  }

  advance.remainingAmount -= amountNumber;
  advance.borrowedAmount += amountNumber;

  advance.requests.push({
    repaymentId: `${advance.requests.length + 1}`,
    date: date,
    amount: amountNumber,
    advanceId: `${advance.requests.length + 1}`,
  });

  user.transactions.push({
    id: `${user.transactions.length + 1}`,
    type: "loan Request",
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
  });

  await writeDB(db);

  res.json({
    message: "Salary Advance successful",
    user,
  });
});

// Set goal route
router.post("/setgoal", verifyToken, async (req, res) => {
  const {
    userId,
    goalType,
    interest,
    goalName,
    targetAmount,
    startDate,
    autoSave,
    reminder,
    deductDate,
  } = req.body;

  // Check for missing required fields
  if (
    !userId ||
    typeof goalType !== "boolean" ||
    !startDate ||
    !targetAmount ||
    typeof autoSave !== "boolean" ||
    typeof reminder !== "boolean" ||
    !deductDate ||
    !goalName ||
    !interest
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await readDB();
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newGoal = {
      savingsId: uuidv4(),
      goalType,
      startDate,
      targetAmount,
      autoSave,
      reminder,
      deductDate,
      goalName,
      interest,
      goalProgress: 0,
      savings: [],
    };

    user.savingsGoals = user.savingsGoals || [];
    user.savingsGoals.push(newGoal);

    await writeDB(db);

    res.status(201).json({
      message: "User Saving Goal registered successfully",
      savingsId: newGoal.savingsId,
    });
  } catch (error) {
    console.error("Error creating saving goal:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Savings route - get user savings goal based on savingsId
router.get("/savings/:savingsId", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const savingsId = req.params.savingsId;

  try {
    const db = await readDB();
    if (!db) {
      return res.status(500).json({ message: "Could not read the database" });
    }

    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const savingsGoal = user.savingsGoals.find(
      (goal) => goal.savingsId === savingsId
    );
    if (!savingsGoal) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    res.json({ user, savingsGoal });
  } catch (error) {
    console.error("Error fetching savings goal:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

//save towards savings goal
router.post("/save", verifyToken, async (req, res) => {
  const { userId, amount, source, savingsId } = req.body;

  if (!userId || !amount || !source || !savingsId) {
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

  const advance = user.savingsGoals.find((adv) => adv.savingsId === savingsId);
  if (!advance) {
    return res.status(400).json({ message: "Savings goal not found" });
  }

  if (amountNumber > advance.targetAmount) {
    return res
      .status(400)
      .json({ message: "Goal amount exceeds target amount" });
  }

  advance.goalProgress += amountNumber;
  user.savings += amountNumber;
  advance.savings.push({
    savingId: `${advance.savings.length + 1}`,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
    source: source,
  });

  user.transactions.push({
    id: `${user.transactions.length + 1}`,
    type: source,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
  });

  await writeDB(db);

  res.json({
    message: "Saving successful",
    user,
  });
});

router.post("/clear-saving", verifyToken, async (req, res) => {
  const { userId, savingsId } = req.body;

  if (!userId || !savingsId == null) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const db = await readDB();
  if (!db) {
    return res.status(500).json({ message: "Could not read the database" });
  }

  const user = db.users.find((user) => user.id === userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const savingsGoalIndex = user.savingsGoals.findIndex(
    (goal) => goal.savingsId === savingsId
  );
  if (savingsGoalIndex === -1) {
    return res.status(400).json({ message: "Savings goal not found" });
  }

  const savingsGoal = user.savingsGoals[savingsGoalIndex];

  user.availableAmount += savingsGoal.goalProgress;
  user.savings -= savingsGoal.goalProgress;

  user.savingsGoals.splice(savingsGoalIndex, 1);

  await writeDB(db);

  res.status(200).json({ message: "Savings goal cleared successfully", user });
});

// Set bill route
router.post("/setbill", verifyToken, async (req, res) => {
  const {
    userId,
    billName,
    accNumber,
    amount,
    recepientphone,
    recepientEmail,
  } = req.body;

  // Check for missing required fields
  if (
    !userId ||
    !billName ||
    !accNumber ||
    !amount ||
    !recepientphone ||
    !recepientEmail
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const db = await readDB();
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse amount as a float to ensure numeric operations
    const amountFloat = parseFloat(amount);
    if (isNaN(amountFloat)) {
      return res.status(400).json({ message: "Invalid amount value" });
    }

    const newBill = {
      billId: uuidv4(),
      billName,
      accNumber,
      amount: amountFloat,
      recepientphone,
      recepientEmail,
      payments: [],
    };

    // Initialize bills array if it doesn't exist
    user.bills = user.bills || [];
    user.bills.push(newBill);

    // Update billTotal
    user.billTotal = (parseFloat(user.billTotal) || 0) + amountFloat;

    await writeDB(db);

    res.status(201).json({
      message: "New bill registered successfully",
      billId: newBill.billId,
    });
  } catch (error) {
    console.error("Error creating new bill:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Pay bill endpoint
router.post("/paybill", verifyToken, async (req, res) => {
  const { userId, amount, source, billId } = req.body;

  // Validate required fields
  if (!userId || !amount || !source || !billId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate amount
  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber) || amountNumber <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  // Read database
  const db = await readDB();
  if (!db) {
    return res.status(500).json({ message: "Could not read the database" });
  }

  // Find user
  const user = db.users.find((user) => user.id === userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Find bill to pay
  const billIndex = user.bills.findIndex((bill) => bill.billId === billId);
  if (billIndex === -1) {
    return res.status(400).json({ message: "Bill not found" });
  }

  const billToPay = user.bills[billIndex];
  if (amountNumber > billToPay.amount) {
    return res.status(400).json({ message: "Amount exceeds bill amount" });
  }

  // Update bill total for the user
  user.billTotal -= amountNumber;

  // Add payment to the bill
  billToPay.payments.push({
    billId: `${billToPay.payments.length + 1}`,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
    source: source,
  });

  // Add transaction to user's transactions list
  user.transactions.push({
    id: `${user.transactions.length + 1}`,
    type: source,
    date: new Date().toISOString().split("T")[0],
    amount: amountNumber,
  });

  // Remove the bill if fully paid
  if (amountNumber === billToPay.amount) {
    user.bills.splice(billIndex, 1);
  } else {
    billToPay.amount -= amountNumber;
  }

  // Write updated database
  await writeDB(db);

  // Respond with success message and updated user data
  res.json({
    message: "Bill paid successfully",
    user,
  });
});

module.exports = router;
