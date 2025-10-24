# UTEST_SHOP INSTALLATION GUIDE

Extract this zip file and open project folder with vscode

Inside the folder, you will see two sub folders "backend" and "frontend"

Run mysql server in background

## Backend

cd backend

npm install

create .env file in /backend

/.env
DATABASE_URL=your_db_url
PORT=5000
JWT_SECRET=your_jwt-token

npx prisma generate

npx prisma migrate dev --name first-init

node prisma/seed.js //seeding dummy product data

node src/server.js

## Frontend

/utest-shop

cd frontend

npm install

npm run dev
