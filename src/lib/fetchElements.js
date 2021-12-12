import {
  getFromTheMovieDB,
  getGamesFromThird,
} from "../services/getFromThirdApis";

const fetchElements = async (elements) => {
  let arrayResult = [];
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const idApi = element.idApi || element;
    if (element.type === "game") {
      const result = await getGamesFromThird({
        idResource: idApi,
        typeElobby: "game",
      });
      arrayResult.push({ ...result, ...element });
    }
    if (element.type === "movie") {
      const result = await getFromTheMovieDB({
        idResource: idApi,
        resourceType: "movie",
        typeElobby: "movie",
      });
      arrayResult.push({ ...result, ...element });
    }
    if (element.type === "tv") {
      const result = await getFromTheMovieDB({
        idResource: idApi,
        resourceType: "tv",
        typeElobby: "tv",
      });
      arrayResult.push({ ...result, ...element });
    }
  }
  return arrayResult;
};

export default fetchElements;
