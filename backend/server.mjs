import express from "express";
import databaseConnection from "./config/connection.js";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import userRouter from "./routes/user.js";
import listingRouter from "./routes/listing.js";


const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", listingRouter);

app.use(notFound);
app.use(errorHandler);

server.listen(process.env.PORT || 4000, () => {
  databaseConnection();
  console.log("Server is running " + process.env.PORT || 4000);
});
