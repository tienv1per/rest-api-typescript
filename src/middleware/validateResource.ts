import express from "express";
import {AnyZodObject} from "zod";

const validate = (schema: AnyZodObject) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
    } catch (e: any) {
        return res.status(400).send(e.error);
    }
};

export default validate;