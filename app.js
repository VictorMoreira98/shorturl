import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
const app = express();

connectDB();

import cors from 'cors'

var originsWhitelist = [
   'http://node-app-403112.uc.r.appspot.com'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}

app.use(cors(corsOptions));

import urlsRouter from './routes/urls.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json' assert {type : "json"};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', urlsRouter);

// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});