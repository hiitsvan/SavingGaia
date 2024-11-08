const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8001;
const { db } = require("./firebase/firebaseAdmin.js");

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const OpportunitiesRouter = require('./routes/OpportunitiesRouter');
const AuthRouter = require('./routes/AuthRouter');
const LikesRouter = require('./routes/LikesRouter');
const NewsRouter = require('./routes/NewsRouter');
const CompletedWorksRouter = require('./routes/CompletedWorksRouter');

app.use('/opportunities', OpportunitiesRouter);
app.use('/auth', AuthRouter);
app.use('/likes', LikesRouter);
app.use('/news', NewsRouter);
app.use('/completed-works', CompletedWorksRouter);

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


