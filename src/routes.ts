import express from "express";
const routes = (app: express.Express) => {
    app.get("/healthcheck", (req: express.Request, res: express.Response) => {
        return res.sendStatus(200);
    });
};

export default routes;