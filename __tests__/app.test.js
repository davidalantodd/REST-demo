const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/User")

// mocking the User.create method with jest.mock
jest.mock("../src/models/User.js", () => ({ create: jest.fn() }));

describe("User routes", () => {
    describe("CREATE controller", () => {
        it("should create a user and return the username", async () => {
            //Arrange
            const userData = {
                username: "testuser",
                password: "Testpassword!",
                email: "testuser@email.com"
            }
            const userMock = { ...userData, _id: "mockedId" }
            User.create.mockResolvedValue(userMock)

            //Act
            const response = await request(app).post("/user").send(userData)

            //Assert
            expect(response.status).toBe(200)
            expect(response.body).toEqual({ user: userMock.username })
            expect(User.create).toHaveBeenCalledWith(userData)
        })

        it("should return an error message if the password isn't strong", async () => {
            const response = await request(app)
                .post("/user")
                .send({ password: "test" });

            expect(response.status).toBe(500)
            expect(response.text).toContain("Password must contain at least one uppercase character and one special character.")

        })
    })
})