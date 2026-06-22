import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js'
import authRoute from './routes/authRoute.js'
import websiteRoute from './routes/websiteRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import contactRoute from './routes/contactRoute.js'
import cookieParser from 'cookie-parser'
import dns from 'dns';
import cors from 'cors'

//change dns
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app =express() //create app
const PORT= process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ai-website-builder-1-fn68.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use('/api/auth', authRoute)
app.use('/api/website', websiteRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/contact', contactRoute)



// for listen server we need two things, port and callback function
app.listen(PORT, ()=>{
  connectDB()
  console.log("server is listening at port:" + PORT);
})
