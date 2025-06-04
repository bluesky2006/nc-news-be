const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const endpointsJson = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("200: Responds with an object with a topics key containing an array of desired objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
        expect(typeof body.topics[0].slug).toBe("string");
        expect(typeof body.topics[0].description).toBe("string");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an object", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("200: Responds with an object with an articles key containing an array of desired objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        expect(typeof body.articles[0].article_id).toBe("number");
        expect(typeof body.articles[0].title).toBe("string");
        expect(typeof body.articles[0].topic).toBe("string");
        expect(typeof body.articles[0].author).toBe("string");
        expect(typeof body.articles[0].created_at).toBe("string");
        expect(typeof body.articles[0].votes).toBe("number");
        expect(typeof body.articles[0].article_img_url).toBe("string");
        expect(typeof body.articles[0].comment_count).toBe("number");
      });
  });
});

describe("GET /api/users", () => {
  test("200: Responds with an object", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("200: Responds with an object with a users key containing an array of desired objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        expect(typeof body.users[0].username).toBe("string");
        expect(typeof body.users[0].name).toBe("string");
        expect(typeof body.users[0].avatar_url).toBe("string");
      });
  });
});
