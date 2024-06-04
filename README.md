# Todo Project using MERN stack (Mongodb, Express.js, React.js and Node.js) 

# Setup instruction
## Step 1: install package dependencies
  - Go to /backend directory and run `npm install` or `yarn install`.
  - Go to /frontend directory and run `npm install` or `yarn install`.

## Step 2: Configure mongodb connection url
- Go to backend directory and create .env file and put into 
  `MONGODB_PATH=your-mongodb-connection-url`

## Step 3:  Change server port and cors origin (Optional)
- Default port: `http://localhost:9000` 
- Cors origin/frontend url: `http://localhost:3000` 
- To change your own port and cors, simply put this key into your .env
 - `SERVER_PORT=your-port` 
 - `CORS_ORIGIN=your-client-origin`

## Step 4: Run project
- Backend: `npm run serve` 
- Frontend: `npm run start`

