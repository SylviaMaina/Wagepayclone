// models/user.js

const { v4: uuidv4 } = require("uuid");

class User {
  constructor(email, idNumber, phoneNumber) {
    this.id = uuidv4(); // Generate a unique ID for each user
    this.email = email;
    this.idNumber = idNumber;
    this.phoneNumber = phoneNumber;
    this.pin = ""; // Placeholder for hashed PIN
  }
}

module.exports = User;
