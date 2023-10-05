import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction): unknown => {
    try {
        const header: string = req.headers?.authorization as unknown as string;
        const token: string = header && header.split(' ')[1];
        const tokenSecrect: string = process.env.TOKEN_SECRECT || "tokenSecrect";
        const decodeToken: string | jwt.JwtPayload = jwt.verify(token, tokenSecrect);
        res.locals.jwtPayload = decodeToken;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token! Please try again");
    }
}