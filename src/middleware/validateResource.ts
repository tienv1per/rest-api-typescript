import express from "express";
import {AnyZodObject} from "zod";

// validate input data from request based on schema
const validate = (schema: AnyZodObject) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // kiem tra tinh hop le cua du lieu dau vao dua tren schema da dinh nghia o folder schema
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
};

export default validate;