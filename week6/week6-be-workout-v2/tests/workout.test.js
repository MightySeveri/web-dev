const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("GET /api/workouts", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0]);
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[1]);
  });

  test("should return workouts as JSON with status 200", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("POST /api/workouts", () => {
  describe("when the payload is valid", () => {
    test("should create a workout and return status 201", async () => {
      const newWorkout = {
        title: "testworkout",
        reps: 10,
        load: 100,
      };

      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(newWorkout)
        .expect(201);
    });
  });

  describe("when the payload is invalid", () => {
    test("should return status 400 when title is missing", async () => {
      const invalidWorkout = {
        reps: 10,
        load: 100,
      };

      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(invalidWorkout)
        .expect(400);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
