const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "https://wagepayclone-epz7.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
