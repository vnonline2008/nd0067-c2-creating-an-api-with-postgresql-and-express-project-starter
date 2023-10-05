import { Order, OrderDetail, OrderModel } from "../../models/orders.model";
import { Product, ProductModel } from "../../models/products.model";
import { User, UserModel } from "../../models/users.model";

describe("Test Order Model", () => {
    const userModel = new UserModel();
    const orderModel = new OrderModel();
    const productModel = new ProductModel();
    let order: Order = {
        userid: 0,
        status: "active"
    }
    let orderDetailTest: OrderDetail = {
        productid: 0,
        orderid: 0,
        quantity: 10
    }
    let orderTest: Order;

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

    it("should return a new order", async () => {
        const result = await orderModel.create(orderTest);
        expect(result.userid).toEqual(orderTest.userid);
        expect(result.status).toEqual(orderTest.status);
    })

    it("should be return an array order", async () => {
        const result = await orderModel.index();
        expect(Array.isArray(result)).toBeTrue();
    })

    it("should be return a order by userId", async () => {
        const userId = orderTest.userid as number
        const result = await orderModel.show(userId);
        expect(result.userid).toEqual(orderTest.userid);
        expect(result.status).toEqual(orderTest.status);
    })

    it("should be return new orderDetail", async () => {
        const result = await orderModel.createOrderDetail(orderDetailTest);
        expect(result.orderid).toEqual(orderDetailTest.orderid);
        expect(result.productid).toEqual(orderDetailTest.productid);
    })

    it("should be return order which is updated status", async () => {
        const orderId = orderTest.id as number;
        const status = 'complete'
        const result = await orderModel.updateOrderStatus(orderId, status);
        expect(result.userid).toEqual(orderTest.userid);
        expect(result.status).toEqual(status);
    })

    it("should delete a order by orderId", async() => {
        const orderId = orderTest.id as number;
        const result = await orderModel.delete(orderId);
        expect(result.id).toEqual(orderId);
    })
});