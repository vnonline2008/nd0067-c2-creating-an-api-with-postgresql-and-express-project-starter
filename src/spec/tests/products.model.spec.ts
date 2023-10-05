import { Product, ProductModel } from "../../models/products.model";

describe("Test Product Model", () => {
    const productModel = new ProductModel();
    const productTest: Product = {
        id: 2,
        name: "Product 1",
        price: 10000
    }

    beforeEach(async () => await productModel.create(productTest))

    it("should return a new product", async () => {
        const result = await productModel.create(productTest);
        expect(result.price).toEqual(productTest.price);
        expect(result.name).toEqual(productTest.name);
    })

    it("should be return an array product", async () => {
        const result = await productModel.index();
        expect(Array.isArray(result)).toBeTrue();
    })

    it("should be return a product by productId", async () => {
        const productId = productTest.id as number
        const result = await productModel.show(productId);
        expect(result.name).toEqual(productTest.name);
        expect(result.price).toEqual(productTest.price);
    })

    it("should delete a product by Id", async() => {
        const result = await productModel.delete(1);
        expect(result.id).toEqual(1);
    })
});