// const ENDPOINT = "http://localhost:27017/api/elements";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/elements`;

export default function getElement({ jwt, id }) {
  return fetch(`${ENDPOINT}/${id}`, {
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
