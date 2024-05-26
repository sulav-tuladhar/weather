-> Firstyl create .env file in the root folder of backend server and paste the same code as given below :-
BASE_URL = https://api.weatherapi.com/v1/current.json?key=81a01136b31c448e980153256242505&

Installation
1. Clone the repo
   git clone https://github.com/sulav-tuladhar/weather.git
2. Install dependencies for the backend
   cd backend
   npm i
4. Install dependencies for the frontend
   cd frontend
   npm i

Running the application
1. Start the backend server
   npm start
   -> This will start the backend server, the server will run on http://localhost:9191 (Check the port if things go wrong in app.ts file inside src folder of the backend)
3. Start the frontend server
   npm run dev
   -> This will start the frontend server, the frontend server will run on port 5173 :- http://localhost:5173
