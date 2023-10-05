import { PoolClient } from "pg";
import { client } from "../database";

export interface Order {
    id?: number,
    userid: number,
    status: string,
}

export interface OrderDetail {
    id?: number,
    orderid: number,
    productid: number,
    quantity: number,
}

export class OrderModel {
    private connection: PoolClient | undefined;

    async index(): Promise<Order[]> {
        try {
            this.connection = await client.connect();
            const sql = 'SELECT * FROM "order"';
            const result = await this.connection.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get products ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async show(userId: number): Promise<Order> {
        try {
            this.connection = await client.connect();
            const sql  = 'SELECT * FROM "order" WHERE userid = ($1)';
            const result = await this.connection.query(sql, [userId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not find this order by userId = ${userId}. Error ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            this.connection = await client.connect();
            const sql = 'INSERT INTO "order" (userid, status) VALUES ($1, $2) RETURNING *';
            const result = await this.connection.query(sql, [order.userid, order.status]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create new order. Error ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async delete(orderId: number): Promise<Order> {
        try {
            this.connection = await client.connect();
            const sql = 'DELETE FROM "order" WHERE id=($1) RETURNING *';
            const result = await this.connection.query(sql, [orderId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete this Order. Error: ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail> {
        try {
            this.connection = await client.connect();
            const sql = 'INSERT INTO orderdetail (orderid, productid, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await this.connection.query(sql, [orderDetail.orderid, orderDetail.productid, orderDetail.quantity]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create this Order Detail. Error ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async updateOrderStatus(orderId: number, status: string): Promise<Order> {
        try {
            this.connection = await client.connect();
            const sql = 'UPDATE "order" SET status = ($1) WHERE id = ($2) RETURNING *';
            const result = await this.connection.query(sql, [status, orderId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not update status for this Order. Error ${error}`);
        } finally {
            this.connection?.release();
        }
    }
}
