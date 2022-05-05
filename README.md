---
author: Alison Vandromme
date: February 2022
---

# Time logger

The time logger application was built for internal purposes. It enables the user to log the time spent working on different projects and comes with an admin interface, displaying user data on charts and giving the possibility to export data in CSV format. 

The frontend application is built with Vue and makes use of Apex Charts. The backend application is a RESTful API, built with Node, Express, and Sequelize. It implements JWT authentication and JSON to CSV conversion. 

## Project setup

### Front

```sh
cd timelog-front
yarn install
yarn dev
```

Served on port 8080.

### Back

```sh
cd timelog-back
npm install
npm run dev
```

Served on port 3000. 