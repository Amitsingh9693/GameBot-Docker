# GameGuru - Full-Stack Game Recommendation Bot 🎮

GameGuru is an interactive, modern, full-stack web application designed to help gamers discover their next favorite game. It features a friendly chatbot-style interface that guides users through selecting their preferred genres, platforms, and popular tags, then fetches highly-rated game recommendations matching their criteria.

This project was built with a focus on modern web architecture, performance optimization (caching), and DevOps best practices (containerization and CI/CD).

---

## ✨ Key Features

- **Interactive UI**: A sleek, chatbot-style interface (GameGuru) that interacts with the user.
- **Dynamic Filtering**: Filter recommendations by game Genres, Platforms, and Tags.
- **RAWG API Integration**: Fetches real-time, accurate gaming data from the RAWG Video Games Database.
- **High Performance**: Utilizes **Redis** to cache API responses, reducing load times for repeated queries.
- **History Tracking**: Stores user session filters and recommendation history in **MongoDB**.
- **DevOps Ready**: Fully containerized using **Docker** & **Docker Compose** for seamless local development and deployment.
- **CI/CD Pipeline**: Includes a declarative **Jenkins** pipeline for automated building and deployment.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 (Bootstrapped with Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API Integration**: Axios (RAWG API)
- **Database ORM**: Mongoose

### Databases & Caching
- **Primary Database**: MongoDB (Stores session filter history)
- **Cache**: Redis (Caches RAWG API responses for 1 hour)

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: Jenkins

---

## 🏗️ Architecture & Data Workflow

1. **User Interaction**: The user interacts with the React frontend on port `3000`, selecting various filters (Genres, Platforms, Tags).
2. **API Request**: When the user clicks "Get Recommendations", the frontend sends an HTTP POST request to the Express backend on port `5000`.
3. **History Logging**: The backend immediately saves the user's generated `sessionId` and selected filters into MongoDB.
4. **Cache Check**: The backend checks Redis for a cached response matching the exact combination of filters.
    - *Cache Hit*: Returns the cached data instantly to the frontend.
    - *Cache Miss*: The backend securely makes a request to the RAWG API using the hidden `RAWG_API_KEY`.
5. **Data Processing**: The backend formats the RAWG data, caches the result in Redis for future identical requests, and sends the payload back to the React frontend.
6. **Rendering**: The frontend smoothly animates the rendering of the Game Recommendation Cards.

---

## 🚀 Setup & Installation

The easiest way to run the entire stack is using Docker Compose, which will automatically spin up the Frontend, Backend, MongoDB, and Redis containers.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- A free API key from [RAWG API](https://rawg.io/apidocs)

### 1. Configure Environment Variables
Clone the repository and set up your `.env` file:

```bash
cp .env.example .env
```
Edit the `.env` file in the root directory and add your RAWG API Key:
```env
PORT=5000
MONGODB_URI=mongodb://mongo:27017/game-recommendations
REDIS_URL=redis://redis:6379
RAWG_API_KEY=your_actual_api_key_here
```

### 2. Build and Start the Containers
Run the following command from the root directory:

```bash
docker compose up -d --build
```

### 3. Access the Application
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### Stopping the Application
To stop the containers without destroying the database volumes:
```bash
docker compose stop
```
To tear down the containers entirely:
```bash
docker compose down -v
```

---

## 📂 Project Structure

```text
Game-Recommendation-Bot/
├── frontend/             # React (Vite) application
│   ├── src/              # React components, pages, and API services
│   ├── package.json      # Frontend dependencies
│   └── Dockerfile        # Multi-stage Docker build using 'serve'
├── backend/              # Node.js Express API
│   ├── config/           # Database and Redis connection setups
│   ├── controllers/      # Route logic and caching implementation
│   ├── models/           # MongoDB Mongoose schemas
│   ├── routes/           # Express API route definitions
│   ├── services/         # External API services (RAWG, Redis)
│   ├── server.js         # Main Express entry point
│   ├── package.json      # Backend dependencies
│   └── Dockerfile        # Node.js Alpine Docker build
├── docker-compose.yml    # Orchestrates all 4 containers and networks
├── Jenkinsfile           # Declarative CI/CD pipeline
└── .env                  # Environment variables
```

---

## 📡 Backend API Endpoints

The backend exposes the following endpoints (Base URL: `http://localhost:5000/api`):

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/genres` | Fetches a list of all game genres. |
| `GET` | `/platforms` | Fetches a list of all gaming platforms. |
| `GET` | `/tags` | Fetches a list of popular game tags. |
| `POST` | `/recommend` | Accepts `sessionId`, `genres`, `platforms`, and `tags` in the body. Saves history to MongoDB and returns recommended games. |

---

## ⚙️ CI/CD Pipeline (Jenkins)

This project includes a `Jenkinsfile` for continuous integration and continuous deployment. 

The pipeline consists of the following stages:
1. **Checkout**: Pulls the latest code from the repository.
2. **Build Backend Image**: Compiles the Node.js Docker image.
3. **Build Frontend Image**: Compiles the React/Vite Docker image.
4. **Deploy**: Runs `docker compose up -d --build` to safely spin down old containers and spin up the new ones.
5. **Cleanup**: Runs `docker image prune -f` to remove old, dangling images and save disk space.

---

## 👨‍💻 Author

**Amit Kumar**  
Lead Developer  
[GitHub Profile](https://github.com/Amitsingh9693)
