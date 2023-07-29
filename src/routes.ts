import express from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: express.Express) => {
    app.get("/healthcheck", (req: express.Request, res: express.Response) => {
        return res.sendStatus(200);
    });

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);
};

export default routes;