const request = require("supertest");

jest.mock("../config/db", () => jest.fn());

jest.mock("../models/userModel", () => ({
	findOne: jest.fn(),
	create: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
	genSalt: jest.fn().mockResolvedValue("salt"),
	hash: jest.fn().mockResolvedValue("hashedPassword"),
	compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn().mockReturnValue("fake-jwt"),
}));

const app = require("../app");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("/api/users endpoints", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /api/users/signup", () => {
		test("returns 201 and token on successful signup", async () => {
			User.findOne.mockResolvedValue(null);
			User.create.mockResolvedValue({ _id: "user-id" });

			const res = await request(app)
				.post("/api/users/signup")
				.send({ name: "Test", email: "test@example.com", password: "pass" })
				.expect(201);

			expect(res.body).toHaveProperty("token", "fake-jwt");
			expect(res.body).toHaveProperty("email", "test@example.com");
			expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
			expect(User.create).toHaveBeenCalled();
			expect(jwt.sign).toHaveBeenCalled();
		});

		test("returns 400 when user already exists", async () => {
			User.findOne.mockResolvedValue({ _id: "existing" });

			const res = await request(app)
				.post("/api/users/signup")
				.send({ name: "Test", email: "exists@example.com", password: "pass" })
				.expect(400);

			expect(res.body).toHaveProperty("error", "User already exists");
		});
	});

	describe("POST /api/users/login", () => {
		test("returns 200 and token on successful login", async () => {
			User.findOne.mockResolvedValue({ _id: "user-id", password: "hashedPassword" });
			bcrypt.compare.mockResolvedValue(true);

			const res = await request(app)
				.post("/api/users/login")
				.send({ email: "test@example.com", password: "pass" })
				.expect(200);

			expect(res.body).toHaveProperty("token", "fake-jwt");
			expect(res.body).toHaveProperty("email", "test@example.com");
			expect(bcrypt.compare).toHaveBeenCalled();
			expect(jwt.sign).toHaveBeenCalled();
		});

		test("returns 400 on invalid credentials", async () => {
			User.findOne.mockResolvedValue(null);

			const res = await request(app)
				.post("/api/users/login")
				.send({ email: "nope@example.com", password: "wrong" })
				.expect(400);

			expect(res.body).toHaveProperty("error", "Invalid credentials");
		});
	});
});

