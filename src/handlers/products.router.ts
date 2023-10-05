import express from 'express';
import { verifyToken } from '../middleware/authentication';
import { Product, ProductModel } from '../models/products.model';

const productModel = new ProductModel();

const index = async (req: express.Request, res: express.Response) => {
    try {
        const products = await productModel.index();
        res.json(products);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const productId: number = req.params.productId as unknown as number;
        if (!productId) {
            res.status(400).send("Bad request");
        }
        const product: Product = await productModel.show(productId);
        res.json(product);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const payload: Product = req.body;
        const product: Product = await productModel.create(payload);
        res.json(product);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const productId: number = req.params.productId as unknown as number;
        const product: Product = await productModel.delete(productId);
        res.json(product);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
}

export const productsRouter = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:productId", show);
    app.post("/products/createProduct", verifyToken, create);
    app.delete("/products/:productId", deleteProduct);
}