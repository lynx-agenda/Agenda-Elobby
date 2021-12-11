import axios from "axios";
import type from "./types.enum";

const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/third`;

const urlType = ({ text, startIndex }) => ({
  [type.books]: {
    url: `${ENDPOINT}/books`,
    params: {
      q: text,
      startIndex: startIndex,
      maxResults: 16, // The maximum number of results to return.
      orderBy: "newest", // Books ordered by [relevance|newest]
      langRestrict: "es", // Restricts the volumes returned to those that are tagged with the specified language
      printType: "all", // Does not restrict by print type
      fields:
        "totalItems,items(id,volumeInfo(title,authors,publisher,publishedDate,description,industryIdentifiers,pageCount,categories,imageLinks,language))", // Filter search results by volume type and availability.
    },
  },
  [type.games]: {
    url: `${ENDPOINT}/games`,
    params: {
      search: text,
      search_precise: true,
      parent_platforms: "1,2,3,7",
      exclude_additions: true,
    },
  },
  [type.movies]: {
    url: `${ENDPOINT}/movies-tvshows`,
    params: { query: text },
  },
  [type.tv]: {
    url: `${ENDPOINT}/movies-tvshows`,
    params: {
      query: text,
    },
  },
});

const queryApi = async ({ text, type, startIndex }) => {
  const { url, params } = urlType({ text, startIndex })[type];
  let response = await axios.get(url, {
    params,
  });

  return response.data;
};

export default queryApi;
