# DevTinder

A **Tinder-style application for developers** — built on the **MERN stack** (MongoDB, Express, React, Node.js).

DevTinder lets developers create a profile, discover other developers, and connect with people they'd like to collaborate or network with — swipe-style "interested" / "ignore" matching, just for the dev community.

## Tech Stack

- **MongoDB** — database
- **Express** — backend web framework
- **React** — frontend (to be added)
- **Node.js** — runtime

## Features (planned)

- User authentication (sign up / log in)
- Create and edit developer profile
- Browse / discover other developers (feed)
- Send connection requests — interested / ignore
- Accept or reject incoming requests
- View your matches / connections

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

```bash
# clone the repo
git clone <your-repo-url>
cd dev-tinder

# install dependencies
npm install
```

### Running the app

```bash
# development (auto-reload via nodemon)
npm run dev

# production
npm start
```

The server runs on **http://localhost:3000**.

## Available Routes

| Route   | Description            |
| ------- | ---------------------- |
| `/home` | Test home endpoint     |
| `/test` | Test endpoint          |

## Project Structure

```
dev-tinder/
├── src/
│   └── app.js          # Express app entry point
├── .gitignore
├── package.json
└── README.md
```

## Scripts

| Script        | Description                          |
| ------------- | ------------------------------------ |
| `npm start`   | Run the server with Node             |
| `npm run dev` | Run the server with nodemon (reload) |

## Author

chandraprakash kushwaha

## License

ISC
