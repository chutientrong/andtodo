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

# Server configuration
## Step 1: install package dependencies
- Clone repository: `git clone https://github.com/chutientrong/andtodo.git`

## Step 2: generate ssl key
- Open command and type: 
1. `openssl genrsa -out privkey.pem 2048`
2. `openssl req -new -key privkey.pem -out cert.csr`
3. `openssl x509 -req -days 365 -in cert.csr -signkey privkey.pem -out fullchain.pem`

## Step 4: deploy
  cd to source repository and type: `cd <repository_name>`
- Development: `docker compose up --build -d`
- Production: `docker compose -f docker-compose.dev.yml up --build -d`