import supertest from "supertest";
import { Order, OrderDetail, OrderModel } from "../../models/orders.model";
import { Product, ProductModel } from "../../models/products.model";
import { User, UserModel } from "../../models/users.model";
import app from "../../server";

const mockServer = supertest(app);

describe("End To End test", () => {
    const userModel = new UserModel();
    const productModel = new ProductModel();
    const orderModel = new OrderModel();
    let token: string;
    const userTest: User = {
        firstname: "test",
        lastname: "test",
        username: "test_user",
        password: "123456",
    }
    let orderTest: Order;
    let order: Order = {
        userid: 0,
        status: 'active'
    }
    let orderDetailTest: OrderDetail = {
        orderid: 0,
        productid: 0,
        quantity: 5
    };

    beforeAll(async () => {
        const response = await mockServer.post('/users/createUser').send(userTest);
        token = response.body.access_token;
    })
    
    beforeEach(async () => {
        const productTest: Product = {
            name: "Product 1",
            price: 10000
        }
        const userTest: User = {
            firstname: "test",
            lastname: "test",
            username: "test_user",
            password: "123456",
        }
        const user = await userModel.create(userTest);
        const product = await productModel.create(productTest);

        order.userid = user.id as number;
        orderTest = await orderModel.create(order);

        orderDetailTest.productid = product.id as number;
        orderDetailTest.orderid = orderTest.id as number;
    })

    it ("API should return status 200 and new order", async() => {
        const response = await mockServer.post('/orders/createOrder')
                                            .auth(token, {type: "bearer"})
                                            .send(orderTest);
        const data: Order = response.body;
        expect(response.statusCode).toBe(200);
        expect(data.status).toEqual(orderTest.status);
    })

    it ("API should response status 200 and array order", async() => {
        const response = await mockServer.get('/orders');
        expect(response.statusCode).toBe(200);
    })

    it ("API should response status 200 and order by userId", async() => {
        const response = await mockServer.get(`/orders/${orderTest.userid}`);
        expect(response.statusCode).toBe(200);
    })

    it ("API should response status 200 and create new order detail", async() => {
        const response = await mockServer.post('/orders/createOrderDetail')
                                            .auth(token, {type: "bearer"})
                                            .send(orderDetailTest);
        const data: OrderDetail = response.body;
        expect(response.statusCode).toBe(200);
        expect(data.quantity).toEqual(orderDetailTest.quantity);
        expect(data.productid).toEqual(orderDetailTest.productid);
        expect(data.orderid).toEqual(orderDetailTest.orderid);
    })

    it ("API should response status 200 and update status of order", async() => {
        const status = 'completed';
        const response = await mockServer.put(`/orders/${orderTest.id}/${status}`)
                                            .auth(token, {type: "bearer"});
        const data: Order = response.body;
        expect(response.statusCode).toBe(200);
        expect(data.status).toEqual(status);
    });

    it ("API should response status 200 and delete order by orderId", async() => {
        const response = await mockServer.delete(`/orders/${orderTest.id}`)
                                            .auth(token, {type: "bearer"});;
        expect(response.statusCode).toBe(200);
    })
})