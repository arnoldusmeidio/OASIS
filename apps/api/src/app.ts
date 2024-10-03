import express, { json, urlencoded, Request, Response, NextFunction } from "express";
import cors from "cors";

import sampleRouter from "./routers/sample.router";

const createApp = () => {
   const app = express();

   // Middleware configuration
   app.use(cors());
   app.use(json());
   app.use(urlencoded({ extended: true }));

   // Routes
   app.get("/api", (req: Request, res: Response) => {
      res.send("Hello, Purwadhika Student API!");
   });

   app.use("/api/samples", sampleRouter);

   // Not found handler
   app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
         res.status(404).send("Not found!");
      } else {
         next();
      }
   });

   // Error handler
   app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
         console.error("Error:", err.stack);
         res.status(500).send("Error!");
      } else {
         next();
      }
   });

   return app;
};

export default createApp;
