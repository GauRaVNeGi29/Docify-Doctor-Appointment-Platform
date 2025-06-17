import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

// App config
const app = express();
const PORT = process.env.PORT;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(cors());

// Api endpoints
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
    res.send(`API Working`);
})


// Server running
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})