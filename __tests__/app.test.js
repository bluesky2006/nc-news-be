const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
const endpointsJson = require("../endpoints.json");
require("jest-sorted");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

// describe("GET /api", () => {
//   test("200: Responds with an object detailing the documentation for each endpoint", () => {
//     return request(app)
//       .get("/api")
//       .expect(200)
//       .then(({ body: { endpoints } }) => {
//         expect(endpoints).toEqual(endpointsJson);
//       });
//   });
// });

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
  test("200: Returned object does not contain an img_url", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics[0].hasOwnProperty("img_url")).toBe(false);
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
  test("200: Returned articles sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("200: Returned object does not contain a body key", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].hasOwnProperty("body")).toBe(false);
      });
  });
  test("200: Returns correct object when passed non-default sort_buy and order queries", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc&topic=mitch")
      .expect(200)
      .then(({ body }) => {
        for (let i = 0; i < body.articles.length - 1; i++) {
          expect(body.articles[i].title <= body.articles[i + 1].title).toBe(
            true
          );
        }
      });
  });
  test("400: Returns 'Invalid sort_by query' if passed invalid sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=bad&order=asc")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort_by query");
      });
  });
  test("400: Returns 'Invalid order query' if passed invalid order query", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=bad")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });
  test("GET /api/articles?topic=nonexistent-topic - responds with 404 if topic doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=nonexistent-topic")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Topic not found");
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

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an object", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("200: Responds with an object with an article key containing an array with the desired object", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(3);
        expect(typeof body.article.title).toBe("string");
        expect(typeof body.article.topic).toBe("string");
        expect(typeof body.article.author).toBe("string");
        expect(typeof body.article.created_at).toBe("string");
        expect(typeof body.article.votes).toBe("number");
        expect(typeof body.article.article_img_url).toBe("string");
        expect(typeof body.article.comment_count).toBe("number");
      });
  });
  test("400: Responds with an error if the article_id is not a number", () => {
    return request(app)
      .get("/api/articles/notanum")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404: Responds with an error if the article_id does not exist", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an object", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("200: Responds with an object with a comments key containing an array with the desired object", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        expect(typeof body.comments[0].comment_id).toBe("number");
        expect(typeof body.comments[0].votes).toBe("number");
        expect(typeof body.comments[0].created_at).toBe("string");
        expect(typeof body.comments[0].author).toBe("string");
        expect(typeof body.comments[0].body).toBe("string");
        expect(body.comments[0].article_id).toBe(3);
      });
  });
  test("200: Returned comments sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("400: Responds with an error if the article_id is not a number", () => {
    return request(app)
      .get("/api/articles/notanum/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404: Responds with an error if the article_id does not exist", () => {
    return request(app)
      .get("/api/articles/99/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with an object", () => {
    return request(app)
      .post("/api/articles/3/comments")
      .send({
        author: "rogersop",
        body: "this is a test",
      })
      .expect(201)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("201: Responds with the posted comment object", () => {
    return request(app)
      .post("/api/articles/3/comments")
      .expect(201)
      .send({
        author: "rogersop",
        body: "this is a test",
      })
      .then(({ body }) => {
        expect(typeof body.comment).toBe("object");
        expect(typeof body.comment.comment_id).toBe("number");
        expect(typeof body.comment.votes).toBe("number");
        expect(typeof body.comment.created_at).toBe("string");
        expect(typeof body.comment.author).toBe("string");
        expect(typeof body.comment.body).toBe("string");
        expect(body.comment.article_id).toBe(3);
      });
  });
  test("400: Responds with an error if the user does not exist", () => {
    return request(app)
      .post("/api/articles/3/comments")
      .send({
        author: "bluesky2006",
        body: "this is a test",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad Request" });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("202: Responds with an object", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({
        inc_votes: 1,
      })
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("202: Responds with a full article object", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({
        inc_votes: 1,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(3);
        expect(typeof body.article.title).toBe("string");
        expect(typeof body.article.topic).toBe("string");
        expect(typeof body.article.author).toBe("string");
        expect(typeof body.article.created_at).toBe("string");
        expect(typeof body.article.votes).toBe("number");
        expect(typeof body.article.article_img_url).toBe("string");
      });
  });
  test("202: Responds with a full article object with the vote property correctly updated", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({
        inc_votes: -567,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.article.votes).toBe(-567);
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Responds with no body content", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("204: Deletes the relevant comment", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(() => {
        return request(app).get("/api/comments/3").expect(404);
      });
  });
  test("400: Responds with error if comment_id type is invalid", () => {
    return request(app)
      .delete("/api/comments/notanum")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404: Responds with error if comment_id is valid but no comment exists", () => {
    return request(app)
      .delete("/api/comments/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("404: Responds with error if attempting to to delete the same comment twice", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(() => {
        return request(app)
          .delete("/api/comments/3")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not Found");
          });
      });
  });
});
