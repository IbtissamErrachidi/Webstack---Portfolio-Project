# SimpleBlogAPI

A simple platform for creating, searching, and managing blog posts.

## Project Overview

SimpleBlogAPI is a web application that allows users to publish, edit, and delete blog posts. It also includes a search feature to find posts. Authentication is secured via JWT tokens, with sessions stored in cookies for a seamless user experience.

## Features

- **User Authentication**: Sign up, log in, and log out using JWT in cookies.
- **Blog Post CRUD**: Create, read, update, and delete blog posts.
- **Post Search**: Search for posts by title or content.

## Technologies Used

### Frontend

- **HTML/CSS**: Managed with **EJS** templates to dynamically generate pages on the server side.

### Backend

- **Node.js**: Backend server.
- **Express.js**: Backend framework for handling routes and HTTP requests.
- **MongoDB**: NoSQL database to store user and blog post information.
- **Mongoose**: ODM for interacting with MongoDB.
- **JWT (JSON Web Tokens)**: For secure authentication.

### Additional Tools

- **bcrypt**: For password hashing.
- **dotenv**: For managing environment variables.
- **express-session**: To manage sessions using cookies.
- **connect-mongo**: Stores sessions in MongoDB.
- **method-override**: Allows using HTTP methods like PUT or DELETE in HTML forms.
- **Nodemon**: Automatically restarts the server during development.

## Installation

Follow these steps to set up the project on your local machine:

### Step 1: Clone the repository

```bash
git clone https://github.com/IbtissamErrachidi/Webstack---Portfolio-Project.git
cd Webstack---Portfolio-Project/backend
```

### Step 2: Install dependencies

In the backend folder, run:

```bash
npm install
```

### Step 3: Set up environment variables

In the backend folder, create a .env file with the following variables:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

### Explanation:

MONGO_URI: The connection URI for your MongoDB database. Replace your_mongodb_connection_string with your actual MongoDB URI.
JWT_SECRET: A secret key to sign JWT tokens. Replace your_jwt_secret with a secure, random string.

## Usage

To start the application, run the server in development mode:
npm run dev

After starting the server, open your browser and visit:

http://localhost:3000

This will load the Blog App on your local environment.

##Future Improvements

Here are some features that could be added to improve the app:

Comments on Posts: Allow users to comment on blog posts.
Email Notifications: Send email updates to users about changes to their posts.
Categories: Allow filtering posts by category to make content browsing easier.

## License
This project is licensed under the ISC License. See the LICENSE file for more details.


This version includes both the titles and detailed explanations for every section. It provides a comprehensive guide to setting up, using, and contributing to the Blog App project.


