# CRUD operation with MongoDB and TypeScript

## Things to have

- Latest Version of Node.js
- Cluster in MongoDB Atlas
- Yarn Package Manager

### To install Yarn

- `npm install -g yarn`

## Set up .env file

Create a file called `.env` in the root directory of your project.

Fill the file with the following content:

```ENV
MONGO_USERNAME=<username>
MONGO_PASSWORD=<password>

API_HEADER=<header>

SERVER_PORT=<port>
```

## Test Endpoint

- `GET /hello-there`

### Response

```json
{
  "message": "General Kebobi"
}
```

**This means the api is running and is working.**

## Endpoints

### Directors

- `GET /directors/read` -> Returns all directors
- `GET /directors/read/:directorId` -> Returns a director by id
- `POST /directors/create` -> Creates a new director

  **Post Body should be like this:**

```json
{
  "name": "Jhon Doe"
}
```

- `PATCH /directors/update/:directorId` -> Updates a director by id

  **Patch Body should be like this:**

```json
{
  "name": "Jhon Doesss"
}
```

- `DELETE /directors/delete/:directorId` -> Deletes a director by id

### Movies

- `GET /movies/read` -> Returns all movies
- `GET /movies/read/:movieId` -> Returns a movie by id
- `POST /movies/create` -> Creates a new movie

  **Post Body should be like this:**

```json
{
  "title": "movie title",
  "director": "director id"
}
```

- `PATCH /movies/update/:movieId` -> Updates a movie by id

  **Patch Body should be like this:**

```json
{
  "title": "movie title any",
  "director": "director id"
}
```

- `DELETE /movies/delete/:movieId` -> Deletes a movie by id
