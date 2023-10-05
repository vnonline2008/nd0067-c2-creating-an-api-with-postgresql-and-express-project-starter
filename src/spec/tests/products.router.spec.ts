import supertest from "supertest";
import { Product } from "../../models/products.model";
import { User } from "../../models/users.model";
import app from "../../server";

const mockServer = supertest(app);

describe("End To End test", () => {
    let token: string;
    const productTest: Product = {
        id: 2,
        name: "Product 1",
        price: 10000
    }

    beforeAll(async () => {
        const userTest: User = {
            firstname: "test",
            lastname: "test",
            username: "test_user",
            password: "123456",
        }
        const response = await mockServer.post('/users/createUser').send(userTest);
        token = response.body.access_token;
    })

    it ("API should response 200 status and create new product", async() => {
        const response = await mockServer.post('/products/createProduct')
                                            .auth(token, {type: "bearer"})
                                            .send(productTest);
        const data: Product = response.body;
        expect(response.statusCode).toBe(200);
        expect(data.name).toBe(productTest.name);
        expect(data.price).toBe(productTest.price);
    })

    it ("API get all product should response 200 status", async() => {
        const response = await mockServer.get('/products');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTrue();
    })

    it ("API should response status 200 and product by productId", async() => {
        const response = await mockServer.get('/products/2');
        expect(response.statusCode).toBe(200);
    })

    it ("API should response status 200 and infor product that is deleted", async() => {
        const response = await mockServer.delete('/products/3');
        expect(response.statusCode).toBe(200);
    })
})