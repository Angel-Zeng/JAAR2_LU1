import express from "express";
import { logger } from "./util/logger.js";

const router = express.Router();

// Routes
router.get("/hello", (req, res) => {
  logger.info("GET request on /hello");
  res.send("<h1>Hello World</h1>");
});

router.get("/hel", (req, res) => {
  logger.info('GET request on "/hel"');
  res.send("Welkom op de homepage");
});

// Export the router (no listen here!)
export default router;