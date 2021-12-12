import parseJwt from "./parseJwt";

// const ENDPOINT = "http://localhost:27017/api/elements";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/elements`;

export default function postReview({ idApi, note, text, type, jwt }) {
  return fetch(`${ENDPOINT}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
    method: "POST",
    body: JSON.stringify({ type, idApi }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let idElement = res.element._id;
      return createReview({ note, idElement, text, jwt }).then((res2) => res2);
    })
    .catch((error) => console.error(error));
}

function createReview({ note, idElement, text, jwt }) {
  let user = parseJwt(jwt);
  return fetch(`http://localhost:27017/api/reviews/${user.userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
    method: "POST",
    body: JSON.stringify({ note, idElement, text }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));
}
