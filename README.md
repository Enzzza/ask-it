# Learning React and Golang

Tutorials are great, but building projects is the best way to learn. Before doing this project i had some experience with **React** and **Golang** was new for me. In this project we have task to build question/answer site called **AskIt**.

## Task Description

1. [x] **Home page**
    - [x] List of last 20 questions with load more functionality
    - [x] List of users with most answers
    - [x] List of questions with the most likes (Hot questions)
2. [x] **Question page**
    - [x] Show question and all details (including answers)
    - [x] If user is *Authenticated* show form for adding new answer
    - [x] If user is *Authenticated* and he answered question, implement functionality for editing and deleting answer.
3. [x] **My questions page**
    - [x] List of last 20 user questions with load more functionality
4. [x] **Login page**
    - [x] Form for login with *email* and *password* field
    - [x] Client side validation for *email*
    - [x] Client side validation for *password*
5. [x] **Register page**
    - [x] Form for registration with fields: *name*, *surname*, *email* and *password*
    - [x] Client side validation for *email* and *password* (name and surname are optional)
6. [x] **Profile page**
    - [x] Show user information
    - [x] Form for modifying user information
    - [x] Form for changing user password
7. [x] **Extras**
    - [x] Authenticated user should get notification when someone answers on his question.

## Technical specifications

### Backend
- **MySQL** must be used 
- **GoLang** must be used
- For protected routes **JWT** must be used

### Frontend
- **React** must be used 
- It is desirable to use additional libraries such as Flux, **Redux** (preferably Redux)
- It is desirable that the application be done in accordance with **React** best practices, where an understanding of the **React** lifecycle of certain components will be clearly seen.
- Use some of the popular HTML / CSS frameworks (Bootstrap, Rush Foundation, **Material Design** )

# Project

## Tech Stack

### Backend

- [GoFiber](https://gofiber.io/) for building REST API
    - [JWT](https://github.com/gofiber/jwt) middleware, for valid token, it sets the user in Ctx.Locals and calls next handler. For invalid token, it returns "401 - Unauthorized" error. For missing token, it returns "400 - Bad Request".
    - [CORS](https://docs.gofiber.io/api/middleware/cors) middleware to enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) with various options.
    - [Limiter](https://docs.gofiber.io/api/middleware/limiter) middleware to limit repeated requests to public APIs and/or endpoints such as password reset etc.
    - [Helmet](https://github.com/gofiber/helmet) middleware for securing Fiber apps by setting various HTTP headers.
    - [Logger](https://docs.gofiber.io/api/middleware/logger) middleware for logging HTTP request/response details.


- [GORM](https://gorm.io/) ORM library for GoLang.
    - [MySQL driver](https://gorm.io/driver/mysql) driver for MySQL.
- [go-playground](https://github.com/go-playground/validator/) for server side validation
- [Redigo](https://github.com/gomodule/redigo) Go client for Redis database used for storing messages while user is offline.

- [Ikisocket](https://github.com/antoniodipinto/ikisocket) WebSocket wrapper for Fiber for sending messages to logged in user.

- [Fiber Swagger](https://github.com/arsmn/fiber-swagger) fiber middleware to automatically generate RESTful API documentation with Swagger 2.0.

### Frontend
- [React](https://reactjs.org/)
- [Context API](https://reactjs.org/docs/context.html) used for client state management, for example storing **authentication** state of user.
- [React Query](https://react-query.tanstack.com/) server state library responsible for managing asynchronous operations between server and client. This library allows us to cache data. 
- [React Hook Form](https://react-hook-form.com/) for form validation.
- [Yup](https://github.com/jquense/yup) object schema validation
- [Material Ui](https://material-ui.com/) user interface library.
- [react-context-saga](https://github.com/DKbyo/react-context-saga#readme) lightweight API to use easily async functions that modify the React Context State. This is used in combination with websocket, for receiving messages over websocket.

### Docker Compose

#### Services

- reverse-proxy - **NGINX** reverse proxy image
- go-backend - **GoFiber** backend image
- react-frontend - **React** frontend image
- redis - **Redis** image
- db - **MySQL** database image

<br>

# Build

## Building image locally 

Clone GitHub repository and cd to it
```bash
git clone https://github.com/Enzzza/ask-it.git
cd ask-it
``` 

Change name of this files:
> .example.backend.env to **.backend.env**
> .example.db.env to **.db.env**

.backend.env

```
SERVER_URL=0.0.0.0:8000
SERVER_READ_TIMEOUT=60
JWT_SECRET_KEY=YOUR SECRET
JWT_SECRET_KEY_EXPIRE_MINUTES_COUNT=1440
 MYSQL_SERVER_URL=root:your_password@tcp(db:3306)/ask_it_db?charset=utf8mb4&parseTime=True&loc=Local
 REDIS_SERVER_URL=redis://redis:6379/0
```

.db.env

```
MYSQL_DATABASE=ask_it_db
MYSQL_ROOT_PASSWORD=your_password
```

Build docker image using this command:

```bash
docker compose up --build
```

This command will build and run containers.

## Pulling and running images from **Docker Hub**

If you don't want to build images locally you can pull them from Docker Hub. Make sure that you have **.backend.env** and **.db.env** in same place as **docker-compose.yaml** file. 

Make new docker-compose file
> docker-compose.yaml
```
version: '3.9'

services:
  reverse-proxy:
    image: enzzzah/nginx-custom:ask-it
    container_name: reverse-proxy
    depends_on:
      - go-backend
      - react-frontend
    ports:
      - "80:80"
      - "8000:8000"

  go-backend:
    image: enzzzah/go-backend:ask-it
    container_name: go-backend
    depends_on:
      - db
      - redis
    ports:
      - "8000"
    env_file: .backend.env
    restart: on-failure

  react-frontend:
    image: enzzzah/react-frontend:ask-it
    container_name: react-frontend
    depends_on:
      - go-backend
    ports:
      - "80"
    restart: always
    volumes:
      - ./project/frontend/config-production.js:/app/config.js

  redis:
    image: redis:6.2.4-alpine
    ports:
      - "6379"

  db:
    image: mysql:8.0.25
    ports:
      - "3306"
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    env_file: .db.env
    volumes:
      - MYDB:/var/lib/mysql
volumes:
  MYDB:
```

Then run following commands
```bash
docker-compose pull 
docker-compose up
```

# Usage

After we ran last commands we can test it locally.
To see our webpage navigate to **localhost** in browser (nginx reverse proxy will route us to react app)

To see backend swagger documentation navigate to **localhost:8000/docs/**

For production we need to change our **backend** API endpoint from **localhost** to *ip* of our server.
<br>
<br>
In root folder there is file:
> config-production.js
``` javascript
window.API_URL = "http://localhost:8000"
```
Change API_URL to your server IP.

# Live demo

[AskIt]()
 