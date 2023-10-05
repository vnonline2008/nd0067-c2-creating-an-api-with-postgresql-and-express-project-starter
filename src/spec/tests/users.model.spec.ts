import { User, UserModel } from "../../models/users.model";

describe("Test User Model", () => {
    const userModel = new UserModel();
    const userTest: User = {
        id: 2,
        firstname: "test",
        lastname: "test",
        username: "test_user",
        password: "123456",
    }

    beforeEach(async () => await userModel.create(userTest))

    it("should return a new user", async () => {
        const result = await userModel.create(userTest);
        expect(result.firstname).toEqual(userTest.firstname);
        expect(result.lastname).toEqual(userTest.lastname);
        expect(result.username).toEqual(userTest.username);
    })

    it("should be return an array user", async () => {
        const result = await userModel.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    })

    it("should be return a user by userId", async () => {
        const userId = userTest.id as number
        const result = await userModel.show(userId);
        expect(result.firstname).toEqual(userTest.firstname);
        expect(result.lastname).toEqual(userTest.lastname);
        expect(result.username).toEqual(userTest.username);
    })

    it("should pass authentication", async () => {
        const result = await userModel.authenticate(userTest.username, userTest.password);
        expect(result.firstname).toEqual(userTest.firstname);
        expect(result.username).toEqual(userTest.username);
    })

    it("should delete user", async() => {
        const result = await userModel.delete(1);
        expect(result.id).toEqual(1);
    })
});