# Fashion Web Application

This repository contains both the frontend and backend code for the Fashion Web Application.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

![image](https://github.com/trongnhanbro/fashion-online-shop/assets/118974931/df939205-510f-47b1-9b4e-de7daf843745)
![image](https://github.com/trongnhanbro/fashion-online-shop/assets/118974931/d295e91b-cc35-4d03-bccc-52998ed93697)
![image](https://github.com/trongnhanbro/fashion-online-shop/assets/118974931/88159716-91c1-4964-83b6-bdad57de0092)
![image](https://github.com/trongnhanbro/fashion-online-shop/assets/118974931/8bab1ebf-6c1a-432c-b1b4-c349c5b3c631)


## Technologies Used

### Frontend
- React
- Redux
- React Router DOM
- Axios
- Sass
- Vite

### Backend
- Node.js
- Express
- Sequelize
- MySQL
- JWT
- Joi

## Setup Instructions

### Prerequisites
- Node.js
- npm or yarn
- MySQL

### Backend Setup
1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the `backend` directory and add your environment variables:
    ```
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASS=your_database_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
    ```
4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the `frontend` directory and add your environment variables:
    ```
    VITE_API_URL=your_backend_api_url
    ```
4. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Scripts

### Backend
- `npm start`: Start the backend server using nodemon.

### Frontend
- `npm run dev`: Start the frontend development server.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Run ESLint to check for linting errors.
- `npm run preview`: Preview the production build.

## Environment Variables

### Backend
- `DB_HOST`: Database host.
- `DB_USER`: Database user.
- `DB_PASS`: Database password.
- `DB_NAME`: Database name.
- `JWT_SECRET`: JWT secret key.

### Frontend
- `VITE_API_URL`: URL of the backend API.

