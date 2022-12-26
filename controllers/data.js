const { StatusCodes } = require('http-status-codes');
const sequelize = require('../db/connect');

const getLongestDurationMovies = async (req, res) => {
	// No try and catch required as using not-found middleware
	const data = await sequelize.query(
		`SELECT tconst,primaryTitle,runTimeMinutes,genres FROM movies ORDER BY runTimeMinutes DESC LIMIT 10`
	);
	res.status(StatusCodes.OK).json({ count: data[0].length, data: data[0] });
};

const addNewMovie = async (req, res) => {
	try {
		const { titleType, primaryTitle, runtimeMinutes, genres } = req.body;

		if (!titleType || !primaryTitle || !runtimeMinutes || !genres) {
			throw new Error();
		}

		const tconst = String(Math.floor(Math.random() * 100000));
		await sequelize.query(`INSERT INTO movies(tconst, titleType, primaryTitle, runtimeMinutes, genres)
			VALUES (${tconst},'${titleType}','${primaryTitle}',${runtimeMinutes},'${genres}');
			`);
		res.status(StatusCodes.CREATED).json({ status: 'success' });
	} catch (e) {
		res.status(StatusCodes.BAD_REQUEST).json({ status: 'failed' });
	}
};

const getTopRatedMovies = async (req, res) => {
	const data = await sequelize.query(
		`SELECT movies.tconst,primaryTitle,genres,ratings.averageRating FROM movies JOIN ratings ON movies.tconst=ratings.tconst WHERE ratings.averageRating>6.00`
	);
	res.status(StatusCodes.OK).json({ data: data[0] });
};

module.exports = {
	getLongestDurationMovies,
	addNewMovie,
	getTopRatedMovies,
};
