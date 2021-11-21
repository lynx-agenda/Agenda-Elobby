var axios = require("axios");

/**
 *
 * @param {query params para modificar la axios request}
 * @returns Respuesta axios con la petición a la API
 */
 export default function getBooks({
	q = "", // Search for volumes that contain this text string.
	maxResults = 4, // The maximum number of results to return.
	orderBy = "newest", // Books ordered by [relevance|newest]
	langRestrict = "es", // Restricts the volumes returned to those that are tagged with the specified language
	printType = "all", // Does not restrict by print type
	startIndex = 0, // The position in the collection at which to start. The index of the first item is 0.
	fields = "totalItems,items(id,volumeInfo(title,authors,publisher,publishedDate,description,industryIdentifiers,pageCount,categories,imageLinks,language))", // Filter search results by volume type and availability.
} = {}) {
	const key = "AIzaSyDijpjeKfyPxZXvCLC3YTg08Iy5UAocMtg";
	const url = "https://www.googleapis.com/books/v1/volumes";

	return axios
		.get(url, {
			params: {
				q: q,
				printType: printType,
				maxResults: maxResults,
				// key: key,
				orderBy: orderBy, //or relevance
				langRestrict: langRestrict,
				startIndex: startIndex,
				fields: fields,
			},
		})
		.then((res) => res.data);
}