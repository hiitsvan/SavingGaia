const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8001;

const { db } = require("./firebase/firebase.js");
// const authMiddleware = require('./middlewares/authMiddleware');
// const errorHandler = require('./middlewares/errorMiddleware');
// const logger = require("./middlewares/loggerMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(logger); // Logging middleware
// app.use(bodyParser.json());
const allowedOrigins = [
	"http://localhost:8080",
  ];
  
  const corsOptions = {
	origin: allowedOrigins,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true, // to allow cookies to be sent along with requests
  };
  
app.use(cors(corsOptions));

//server check
app.listen(PORT, (error) => {
	if (!error)
		console.log(
			"Server is Successfully Running, and App is listening on port " + PORT
		);
	else console.log("Error occurred, server can't start", error);
});

//routes
app.get("/", (req, res) => {
	res.status(200).json("Welcome, your app is working well");
});
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

//authentication
// app.use("/auth", require("./routes/auth"));
const MatchOpportunitiesRouter = require('./routes/MatchOpportunitiesRouter.js')
app.use('/api/match', MatchOpportunitiesRouter)