// const ENDPOINT = "http://localhost:27017/api/tierlists";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/tierlists`;

export default function getTierlists({ jwt }) {
  return fetch(`${ENDPOINT}`, {
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
