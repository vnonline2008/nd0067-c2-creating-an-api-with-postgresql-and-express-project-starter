import supertest from "supertest";
import { User } from "../../models/users.model";
import app from "../../server";

const mockServer = supertest(app);

describe("End To End test", () => {
    let token: string;
    const userTest: User = {
        id: 2,
        firstname: "test",
        lastname: "test",
        username: "test_user",
        password: "123456",
    }

    beforeAll(async () => {
        const response = await mockServer.post('/users/createUser').send(userTest);
        token = response.body.access_token;
    })

    it ("API should response 200 status and access token", async() => {
        const response = await mockServer.post('/users/createUser').send(userTest);
        token = response.body.access_token
        expect(response.statusCode).toBe(200)
        expect(response.body.access_token).not.toBeNull()
    })

    it ("API get all user should response 200 status", async() => {
        const response = await mockServer.get('/users').auth(token, {type: "bearer"});
        expect(response.statusCode).toBe(200);
    })

    it ("API should response 401 status", async() => {
        const response = await mockServer.get('/users');
        expect(response.statusCode).toBe(401);
    })

    it ("API should response status 200 and single user", async() => {
        const response = await mockServer.get('/users/2').auth(token, {type: "bearer"});
        expect(response.statusCode).toBe(200);
    })

    it ("API should response status 200 and infor user who is deleted", async() => {
        const response = await mockServer.delete('/users/3').auth(token, {type: "bearer"});
        expect(response.statusCode).toBe(200);
    })
})