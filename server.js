const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./backend/routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "https://wagepayclone-epz7.vercel.app",
  "http://localhost:9000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
