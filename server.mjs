import express from "express";
import winston from "winston";
import {logger} from "./util/logger.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  logger.debug(`${req.method} method was called.`);
  next();
});

app.use("/routes", dashboardRoutes);

// route not found
app.use((req, res, next) => {
  logger.debug("non exisitng route called");
  next({
    msg: "non existing route",
    status: 404
  })
});

// error handler
app.use((error, req, res, next) => {
  logger.warn("error handler called")
  res.send(`<h1>error: ${error.msg} </h1>`)
});

app.listen(port, () =>
{
  logger.info(`example app listening on port ${port}`);
});
