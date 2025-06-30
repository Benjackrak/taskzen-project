const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");                // Allow cross-origin requests
const dotenv = require("dotenv");               // Load .env variables
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();                        // create express app
const PORT = process.env.PORT || 5000;        // Use .env or fallback to 5000

app.use(cors());        // enable cors
app.use(express.json());            // Parse incoming json

app.get('/', (req, res) => {
    res.send('TaskZen API is running...');
});

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Connect to Mongoose and start server                             // process.env.MONGO_URI -> 
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => console.log(`MongoDB error: ${err}`));

app.listen(PORT || 5000, () => console.log(`Server Running on port ${PORT}`));