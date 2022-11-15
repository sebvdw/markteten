import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './routes/auth.js';
import auction from './routes/auction.js';
import { logTime } from './middleware/logtime.js';


const app = express()
const port = process.env.PORT || 5000;

dotenv.config();

// middleware
app.use(express.json());
app.use(logTime);
app.use(cors());


// routes
app.use('/auth', auth);
app.use('/auction', auction);


app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.json({ msg: "hello world"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})