import { PoolClient } from "pg";
import { client } from "../database";

export interface Product {
    id?: number,
    name: string,
    price: number,
}

export class ProductModel {
    private connection: PoolClient | undefined;

    async index(): Promise<Product[]> {
        try {
            this.connection = await client.connect();
            const sql = 'SELECT * FROM product';
            const result = await this.connection.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get products ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async show(productId: number): Promise<Product> {
        try {
            this.connection = await client.connect();
            const sql  = 'SELECT * FROM product WHERE id = ($1)';
            const result = await this.connection.query(sql, [productId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not find productId = ${productId}. Error ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            this.connection = await client.connect();
            const sql = 'INSERT INTO product (name, price) VALUES ($1, $2) RETURNING *';
            const result = await this.connection.query(sql, [product.name, product.price]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create new product. Error ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async delete(productId: number): Promise<Product> {
        try {
            this.connection = await client.connect();
            const sql = 'DELETE FROM product WHERE id=($1) RETURNING *';
            const result = await this.connection.query(sql, [productId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete this Product. Error: ${error}`);
        } finally {
            this.connection?.release();
        }
    }
}