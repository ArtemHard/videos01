import express, { Express, Request, Response } from 'express';
import { testingRouter } from './testing/routers/testing.routers';
import { setupSwagger } from './core/swagger/setup-swagger';
import { videosRouter } from './drivers/routers/videos.router';

export const setupApp = (app: Express) => {
  app.use(express.json());
 
  app.get("/", (req, res) => {
    res.status(200).send("hello world!!!");
  });
 
  // app.use("/api/videos", driversRouter); // URL теперь начинается с /api/
  app.use("/api/videos", videosRouter); // URL теперь начинается с /api/
  app.use("/api/testing", testingRouter); // URL теперь начинается с /api/
 
  setupSwagger(app);
  return app;
};