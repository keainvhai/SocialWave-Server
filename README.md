# SocialWave Server

   Backend server for SocialWave social media application.

   ## Technologies Used
   - Node.js
   - Express
   - MySQL
   - Sequelize
   - JWT Authentication

   ## Setup Instructions
   1. Clone the repository
   2. Install dependencies: `npm install`
   3. Create `.env` file with required environment variables
   4. Run the server: `npm start`

# API Documentation

## Authentication Endpoints (/auth)

### Register User
- **URL:** `/auth/`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:** "success"

### Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "JWT_TOKEN",
    "username": "string",
    "id": "number"
  }
  ```

### Validate Token
- **URL:** `/auth/auth`
- **Method:** `GET`
- **Auth:** Required
- **Response:** User information

### Get User Basic Info
- **URL:** `/auth/basicinfo/:id`
- **Method:** `GET`
- **Response:** User information (excluding password)

### Change Password
- **URL:** `/auth/changepassword`
- **Method:** `PUT`
- **Auth:** Required
- **Body:**
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
- **Response:** "success" or error message

## Posts Endpoints (/posts)

### Get All Posts
- **URL:** `/posts`
- **Method:** `GET`
- **Auth:** Required
- **Response:**
  ```json
  {
    "listOfPosts": "array",
    "likedPosts": "array"
  }
  ```

### Get Post by ID
- **URL:** `/posts/byId/:id`
- **Method:** `GET`
- **Response:** Single post object

### Get Posts by User ID
- **URL:** `/posts/byuserId/:id`
- **Method:** `GET`
- **Response:** Array of posts

### Create Post
- **URL:** `/posts`
- **Method:** `POST`
- **Auth:** Required
- **Body:**
  ```json
  {
    "title": "string",
    "postText": "string"
  }
  ```

### Update Post Title
- **URL:** `/posts/title`
- **Method:** `PUT`
- **Auth:** Required
- **Body:**
  ```json
  {
    "newTitle": "string",
    "id": "number"
  }
  ```

### Update Post Text
- **URL:** `/posts/postText`
- **Method:** `PUT`
- **Auth:** Required
- **Body:**
  ```json
  {
    "newText": "string",
    "id": "number"
  }
  ```

### Delete Post
- **URL:** `/posts/:postId`
- **Method:** `DELETE`
- **Auth:** Required
- **Response:** "DELETED SUCCESSFULLY"

## Likes Endpoints (/likes)

### Toggle Like
- **URL:** `/likes`
- **Method:** `POST`
- **Auth:** Required
- **Body:**
  ```json
  {
    "PostId": "number"
  }
  ```
- **Response:**
  ```json
  {
    "liked": "boolean"
  }
  ```

## Comments Endpoints (/comments)

### Get Comments by Post
- **URL:** `/comments/:postId`
- **Method:** `GET`
- **Response:** Array of comments

### Create Comment
- **URL:** `/comments`
- **Method:** `POST`
- **Auth:** Required
- **Body:**
  ```json
  {
    "commentBody": "string",
    "PostId": "number"
  }
  ```

### Delete Comment
- **URL:** `/comments/:commentId`
- **Method:** `DELETE`
- **Auth:** Required
- **Response:** "DELETED SUCCESSFULLY"
