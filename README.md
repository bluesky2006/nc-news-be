# northcoder news API

**Hosted API**: [https://nc-news-3jz4.onrender.com](https://nc-news-3jz4.onrender.com)  
**GitHub repo**: [https://github.com/bluesky2006/nc-news-be](https://github.com/bluesky2006/nc-news-be)

## Summary

The nc news API is a RESTful backend project built using **Node.js**, **Express**, and **PostgreSQL**. It exposes endpoints for a Reddit-style news aggregation service, allowing users to:

- Browse and filter articles
- Vote on articles
- Post and delete comments
- Explore topics

This project was built during the **Northcoders JavaScript Software Development Bootcamp** and demonstrates:

- SQL querying and database schema design
- Express routing and MVC architecture
- Data validation and custom error handling
- Integration testing with Jest and Supertest
- Deployment via Render

## Getting started locally

These instructions will get the project running on your machine for development and testing.

### 1. Clone the repository

```bash
git clone https://github.com/bluesky2006/nc-news-be.git
cd nc-news-be
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment configuration

Add two environment files at the root of the project:

#### `.env.development`
```
PGDATABASE=nc_news
```

#### `.env.test`
```
PGDATABASE=nc_news_test
```

> These files define which PostgreSQL database to connect to depending on the environment.

### 4. Set up the local databases

Ensure PostgreSQL is installed and running, then run:

```bash
npm run setup-dbs
```

This will create your local `development` and `test` databases.

### 5. Seed the development database

```bash
npm run seed-dev
```

Populates the `nc_news` database with test data.

### 6. Start the server

```bash
npm start
```

The server will be available at:  
[http://localhost:9090](http://localhost:9090)

### 7. Run the test suite

```bash
npm test
```

This executes the full test suite against the test database using Jest and Supertest.

## 📚 API documentation

Once the server is running, visit:

```
http://localhost:9090/api
```

This will return a JSON object describing all available endpoints, accepted methods, parameters, and example responses.

## 📋 Requirements

- **Node.js:** v20.11.0 or later (tested with v23.11.0)
- **PostgreSQL:** v14+

All other dependencies will be installed via `npm install`.

## 🗺️ Database diagram

![Database diagram](db_diagram.png)

## 📬 Contact

Feel free to fork this repo, submit issues or reach out with suggestions.  
This project is part of my portfolio – if you're reading this via my CV, thanks for stopping by!
