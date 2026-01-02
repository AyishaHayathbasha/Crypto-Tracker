const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mock user profile route
app.get("/api/user/profile", (req, res) => {
  res.json({
    name: "Narmatha",
    email: "narmatha@example.com",
    profilePic: "https://i.pravatar.cc/150?img=3"
  });
});

app.listen(3000, () => console.log("✅ Mock server running on port 3000"));
