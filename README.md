# Book Review App

A full-stack web application for managing books and reviews with JWT-based authentication, built using Node.js, Express, MongoDB, and EJS templating.


# Features

- JWT-based authentication (Signup/Login)
- Add/view books with optional filters (author, genre)
- Authenticated users can add/update/delete their reviews
- Search books by title or author (partial + case-insensitive)
- Responsive Bootstrap frontend using EJS
- Pagination support
- Environment variable config (`.env`)



## Setup Instructions

### 1. Clone the Repository

bash
git clone https://github.com/ShwetaKhatake/Book-Review-API-Project.git
cd book-review-app

### 2. Install Dependencies

npm install

### 4. Start MongoDB
Ensure MongoDB is running locally:
mongosh

### 5. Run the App
node app.js
Visit http://localhost:8080 in your browser.

### Example API Requests
Signup
curl -X POST http://localhost:8080/signup -H "Content-Type: application/json" \
-d '{"username":"john","email":"john@example.com","password":"123456"}'
Login
curl -X POST http://localhost:8080/login -H "Content-Type: application/json" \
-d '{"email":"john@example.com","password":"123456"}'
Add Book (Authenticated)
curl -X POST http://localhost:8080/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{"title":"The Hobbit","author":"J.R.R. Tolkien","genre":"Fantasy"}'
Submit Review (Authenticated)
curl -X POST http://localhost:3000/books/<BOOK_ID>/reviews \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{"rating": 5, "comment": "Amazing book!"}'

### Design Decisions & Assumptions
1. Used JWT + HTTP-only cookie for secure token storage and session handling
2. MongoDB used for its schema flexibility and ease of integration with Mongoose
3. EJS used for rendering dynamic UI with Bootstrap
4.  Each user can leave only one review per book
5.  Reviews are paginated under each book

### Database Schema
## User
{
  username: String,
  email: String,
  password: String (hashed)
}

# Book
{
  title: String,
  author: String,
  genre: String,
  publishedYear:Number,
  createdBy: ObjectId (ref: User)
}

# Review
{
  rating: Number (1–5),
  comment: String,
  book: ObjectId (ref: Book),
  user: ObjectId (ref: User),
  createdAt: Date
}



