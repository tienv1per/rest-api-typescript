import express from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

const routes = (app: express.Express) => {
    app.get("/healthcheck", (req: express.Request, res: express.Response) => {
        return res.sendStatus(200);
    });

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

    app.get("/api/sessions", requireUser, getUserSessionHandler);
};

export default routes;