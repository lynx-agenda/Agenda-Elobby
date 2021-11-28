import axios from "axios";
import type from "./types.enum";

const urlType = ({ text, startIndex }) => ({
  [type.books]: {
    url: "https://www.googleapis.com/books/v1/volumes",
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
    url: `https://api.rawg.io/api/games`,
    params: {
      key: "f65e3ff64bf5436f83b6ba0f8b83ac3b",
      search: text,
      search_precise: true,
      parent_platforms: "1,2,3,7",
      exclude_additions: true,
    },
  },
  [type.movies]: {
    url: `https://api.themoviedb.org/3/search/movie`,
    params: { api_key: "d6c7a342258732312d949314913635e7", query: text },
  },
  [type.tv]: {
    url: `https://api.themoviedb.org/3/search/tv`,
    params: {
      api_key: "d6c7a342258732312d949314913635e7",
      query: text,
    },
  },
});

const queryApi = async ({ text, type, startIndex }) => {
  const { url, params } = urlType({ text, startIndex })[type];
  let response = await axios.get(url, {
    params,
  });

  console.log(`response`, response.data);
  return response.data;
};

export default queryApi;
