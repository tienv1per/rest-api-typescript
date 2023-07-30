import express from "express";

const requireUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = res.locals.user;

    if(!user) {
        return res.sendStatus(403);
    }
    return next();
};

export default requireUser;