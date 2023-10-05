import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/authentication';
import { User, UserModel } from '../models/users.model';
import dotenv from 'dotenv';
dotenv.config();

const userModel = new UserModel();

const authenticate = async (req: express.Request, res: express.Response) => {
    try {
        const payload: User = req.body;
        const user = await userModel.authenticate(payload.username, payload.password);
        const tokenSecrect = process.env.TOKEN_SECRECT || "tokenSecrect";
        const token = jwt.sign({ user: user }, tokenSecrect);
        res.json(token);
    } catch (error) {
        res.status(401).send(`Error: ${error}`);
    }
}

const index = async (req: express.Request, res: express.Response) => {
    try {
        const users = await userModel.index();
        res.json(users);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const userId: number = req.params.userId as unknown as number;
        if (!userId) {
            res.status(400).send("Bad request");
        }
        const user: User = await userModel.show(userId);
        res.json(user);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const payload: User = req.body;
        const tokenSecrect = process.env.TOKEN_SECRECT || "tokenSecrect"
        const user: User = await userModel.create(payload);
        const token = jwt.sign({ user: user}, tokenSecrect);
        res.json({ access_token : token});
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId: number = req.params.userId as unknown as number;
        const user: User = await userModel.delete(userId);
        res.json(user);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

export const usersRouter = (app: express.Application) => {
    app.post("/users/auth", authenticate);
    app.get("/users", verifyToken, index);
    app.get("/users/:userId", verifyToken, show);
    app.post("/users/createUser", create);
    app.delete("/users/:userId", verifyToken, deleteUser);
}
