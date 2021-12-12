import parseJwt from "./parseJwt";

// const ENDPOINT = "http://localhost:27017/api/reviews";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/reviews`;

export default function getReviewsForUser({ jwt }) {
  let user = parseJwt(jwt);
  return fetch(`${ENDPOINT}/${user.userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res)
    .catch((error) => console.error(error));
}
