import express from 'express';
import { verifyToken } from '../middleware/authentication';
import { Order, OrderDetail, OrderModel } from '../models/orders.model';

const orderModel = new OrderModel();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const orders = await orderModel.index();
        res.json(orders);
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
        const order: Order = await orderModel.show(userId);
        res.json(order);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const payload: Order = req.body;
        const order: Order = await orderModel.create(payload);
        res.json(order);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        const orderId: number = req.params.orderId as unknown as number;
        const order: Order = await orderModel.delete(orderId);
        res.json(order);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const createOrderDetail = async (req: express.Request, res: express.Response) => {
    try {
        const payload: OrderDetail = req.body;
        const orderDetail = await orderModel.createOrderDetail(payload);
        res.json(orderDetail);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const updateOrderStatus = async (req: express.Request, res: express.Response) => {
    try {
        const orderId: number = req.params.orderId as unknown as number;
        const status: string = req.params.status as unknown as string;
        const order: Order = await orderModel.updateOrderStatus(orderId, status);
        res.json(order);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

export const ordersRouter = (app: express.Application) => {
    app.get("/orders", index);
    app.get("/orders/:userId", verifyToken, show);
    app.post("/orders/createOrder", verifyToken, create);
    app.put("/orders/:orderId/:status", verifyToken, updateOrderStatus);
    app.delete("/orders/:orderId", verifyToken, deleteOrder);
    app.post("/orders/createOrderDetail", verifyToken, createOrderDetail);
}
