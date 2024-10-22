import express, { json, urlencoded, Request, Response } from "express";
import cors from "cors";

import authRouter from "./routers/auth-router";
import sampleRouter from "./routers/sample-router";
import property from "./routers/property-router";
import userRouter from "./routers/user-router";
import bookingRouter from "./routers/booking-router";
import { verifyToken } from "./middlewares/auth-middleware";
import { notFoundMiddleware } from "./middlewares/not-found-middleware";
import room from "./routers/room-route";

import { tenantGuard } from "@/middlewares/auth-middleware";

import { error } from "./middlewares/error-middleware";
import cookieParser from "cookie-parser";

const createApp = () => {
   const app = express();

   // Middleware configuration
   app.use(
      cors({
         origin: process.env.CLIENT_PORT,
         credentials: true,
      }),
   );
   app.use(json());
   app.use(cookieParser());
   app.use(urlencoded({ extended: true }));

   // Routes
   app.get("/api", (req: Request, res: Response) => {
      res.send("Hello, Purwadhika Student API!");
   });

   app.use("/api/samples", sampleRouter);

   // Auth Route
   app.use("/api/v1/auth", authRouter);

   // User Route
   app.use("/api/v1/users", verifyToken, userRouter);

   // property Route
   app.use("/api/v1/property", verifyToken, property);

   //tenant Route
   app.use("/api/v1/tenant", verifyToken, tenantGuard, property);

   app.use("/api/v1/room", room);

   // Not found handler
   app.use(notFoundMiddleware);

   // Error handlers
   app.use(error);

   return app;
};

export default createApp;
