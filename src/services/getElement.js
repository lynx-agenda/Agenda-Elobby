const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/elements";

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