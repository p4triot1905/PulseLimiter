import express from "express";
import { pulseLimiter } from "../src/middleware/express";

const app = express();

app.use(
  pulseLimiter({
    windowMs: 60000,
    maxRequests: 5
  })
);

app.get("/", (req, res) => {
  res.send("Hello from PulseLimiter ⚡");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
