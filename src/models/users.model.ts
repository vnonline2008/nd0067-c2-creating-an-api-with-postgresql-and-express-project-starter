import { PoolClient } from 'pg';
import { client } from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export interface User {
    id?: number,
    firstname?: string,
    lastname?: string,
    username: string,
    password: string,
}

export class UserModel {

    private connection: PoolClient | undefined;
    private pepper = process.env.PEPPER || 'pepper';
    private saltRounds = process.env.SALT || '10';

    async authenticate(username: string, password: string): Promise<User> {
        try {
            this.connection = await client.connect();
            const sql = 'SELECT * FROM "user" WHERE username=($1)';
            const result = await this.connection.query(sql, [username]);
            const user: User = result.rows[0];
            if (!user) {
                throw new Error(`Can not find user ${username}`);
            }
            if (!(user.username === 'admin' && user.id === 1) 
                && !bcrypt.compareSync(`${password}${this.pepper}`, user.password)) 
            {
                throw new Error(`Username or password is not correct`);
            }
            return user;
        } catch (error) {
            throw error;
        } finally {
            this.connection?.release();
        }

    }

    async index(): Promise<User[]> {
        try {
            this.connection = await client.connect();
            const sql = 'SELECT * FROM "user"';
            const result = await this.connection.query(sql);
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get users ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async show(userId: number): Promise<User> {
        try {
            this.connection = await client.connect();
            const sql = 'SELECT * FROM "user" WHERE id = ($1)';
            const result = await this.connection.query(sql, [userId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not find userId = ${userId} ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async create(user: User): Promise<User> {
        try {
            this.connection = await client.connect();
            const sql = 'INSERT INTO "user" (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
            const hashPassword = bcrypt.hashSync(`${user.password}${this.pepper}`, parseInt(this.saltRounds));
            const result = await this.connection.query(sql, [user.firstname, user.lastname, user.username, hashPassword]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not create new user ${error}`);
        } finally {
            this.connection?.release();
        }
    }

    async delete(userId: number): Promise<User> {
        try {
            this.connection = await client.connect();
            const sql = 'DELETE FROM "user" WHERE id=($1) RETURNING *';
            const result = await this.connection.query(sql, [userId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not delete this User ${error}`);
        } finally {
            this.connection?.release();
        }
    }
}