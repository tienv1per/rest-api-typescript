import express from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction
    ) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    const refreshToken = get(req, "headers.x-refresh");

    if(!accessToken){
        return next();
    }

    const {decoded, expired} = verifyJwt(accessToken);
    if(decoded){
        res.locals.user = decoded;
        return next();
    }

    // if(expired && refreshToken){
    //     const newAccessToken = await 
    // }
    return next();
}

export default deserializeUser;