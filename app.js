const express = require('express');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
// connectDB
require('./db/connect');
// routers
const router = require('./routes/data');

// error handler
const notFoundMiddleware = require('./middleware/not-found');

const app = express();

// extra packages
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use('/api/v1', router);

// middleware
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
