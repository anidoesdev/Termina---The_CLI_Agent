# Termina - The AI CLI Agent 🤖
Termina is a smart command-line assistant that translates plain English into precise shell commands. No more searching for the right syntax for git, kubectl, or complex find operations. Just ask, and Termina delivers the command you need, instantly.

This project is a full-stack application designed to showcase agentic AI design and a modern TypeScript-based tech stack.

# ✨ Features
Natural Language Processing: Translates plain English queries into executable commands for Linux/macOS shells, git, and kubectl.

Command Explainer: An AI-powered feature that breaks down and explains what each part of a generated command does, turning the tool into a powerful learning resource.

Built-in Safety: Automatically detects potentially destructive commands (like rm -rf) and displays a clear warning to the user.

Modern UI: A clean, aesthetic, and fully responsive interface built with React and Tailwind CSS.

# 🛠️ Tech Stack
This project is a monorepo containing a separate frontend and backend application.

### Backend
Runtime: Node.js with Express.js

Language: TypeScript

AI Integration: OpenAI API

### Frontend
Framework: React with Vite

Language: TypeScript

Styling: Tailwind CSS

API Communication: Axios

# 🚀 Getting Started
To run this project locally, you will need to have Node.js and npm installed.

1. Clone the Repository
git clone 
cd termina

2. Set Up the Backend
The backend server handles the AI logic and API requests.

## Navigate to the backend directory
cd backend

## Install dependencies
npm install

## Create an environment file
touch .env

Next, you need to add your OpenAI API key to the .env file.

.env

OPENAI_API_KEY="YOUR_API_KEY_HERE"

Finally, start the backend server:

## Start the server (runs on http://localhost:8000)
npm run dev

# 3. Set Up the Frontend
Open a new terminal for this step.

## Navigate to the frontend directory from the root
cd frontend

## Install dependencies
npm install

## Start the development server (runs on http://localhost:5173)
npm run dev

# 4. Open the Application
Open your web browser and navigate to http://localhost:5173. You should now be able to use the application!

# 🔮 Future Improvements
Real-time Streaming: Integrate WebSockets (Socket.IO) to stream the AI's response for a more dynamic user experience.

Copy to Clipboard: A simple button to instantly copy the generated command.

Command History: A feature to view and reuse previously generated commands.

Support for More Tools: Extend the AI prompt to support other CLIs like Docker, AWS CLI, or GCP's gcloud.

User Authentication: Allow users to sign in and save their command history.



