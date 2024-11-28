const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let token;
describe("User Authentication ", () => {
  // register first tame
  beforeAll(async () => {
    server = app.listen(0);
    await request(app).post("/api/auth/register").send({
      username: "kratikTestUser",
      name: "kratikTest",
      email: "kratikTest@example.com",
      password: "kratikTest",
      role: "admin",
    });
    const res = await request(app).post("/api/auth/login").send({
      email: "kratikTest@example.com",
      password: "kratikTest",
    });
    token = res.body.token;
  });

  //
  it("should not register an existing user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "kratikTestUser",
      name: "kratikTest",
      email: "kratikTest@example.com",
      password: "kratikTest",
      role: "admin",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });
  //
  // missing fields
  it("should return a validation error for missing fields", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "invalidUser",
      email: "invalidUser@example.com",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Error creating user");
  });
  //

  it("should log in an existing user successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "kratikTest@example.com",
      password: "kratikTest",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });
  //

  it("should not log in with an incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "uniqueTest@example.com",
      password: "wrongPassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });
  //

  it("should not log out without a token", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Token not found");
  });
  //
  it("should log out successfully with a valid token", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
});

describe("User Authorization", () => {
  let mockToken;

  beforeAll(() => {
    mockToken = jwt.sign(
      {
        username: "kratikTestUser",
        name: "kratikTest",
        email: "kratikTest@example.com",
        password: "kratikTest",
        role: "admin",
      },
      process.env.JWT_SECRET
    );
  });

  it("should access a protected route with a valid token", async () => {
    const res = await request(app)
      .post("/api/request/admin")
      .set("Authorization", `Bearer ${mockToken}`);
    expect(res.statusCode).toBe(200);
  });
  it("should not access a protected route without a valid token", async () => {
    const res = await request(app).post("/api/request/admin");
    expect(res.statusCode).toBe(401);
  });
  it("should access a protected user route with an admin valid token", async () => {
    const res = await request(app)
      .post("/api/request/user")
      .set("Authorization", `Bearer ${mockToken}`);
    expect(res.statusCode).toBe(403);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
