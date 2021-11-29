// const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/third`;
const ENDPOINT = `https://young-badlands-18005.herokuapp.com/third`;

module.exports = {
	getBooksFromThird,
	getFromTheMovieDB,
    getGamesFromThird
};

function getBooksFromThird({
	q = "", // Search for volumes that contain this text string.
	maxResults = 4, // The maximum number of results to return.
	orderBy = "newest", // Books ordered by [relevance|newest]
	langRestrict = "es", // Restricts the volumes returned to those that are tagged with the specified language
	printType = "all", // Does not restrict by print type
	startIndex = 0, // The position in the collection at which to start. The index of the first item is 0.
	fields = "totalItems,items(id,volumeInfo(title,authors,publisher,publishedDate,description,industryIdentifiers,pageCount,categories,imageLinks,language))", // Filter search results by volume type and availability.
} = {}) {
	return fetch(`${ENDPOINT}/books`, {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: JSON.stringify({ q, maxResults, orderBy, langRestrict, printType, startIndex, fields }),
	})
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			return res;
		})
		.catch((error) => console.log(error));
}

function getFromTheMovieDB({ query = "", page = 1, idResource = "", action = "", resourceType = "", season = "" } = {}) {

	return fetch(`${ENDPOINT}/movies-tvshows`, {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: JSON.stringify({ query, page, idResource, action, resourceType, season }),
	})
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((error) => console.log(error));
}

function getGamesFromThird({ search = "", idResource = "" } = {}) {

	return fetch(`${ENDPOINT}/games`, {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: JSON.stringify({ search, idResource }),
	})
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((error) => console.log(error));
}