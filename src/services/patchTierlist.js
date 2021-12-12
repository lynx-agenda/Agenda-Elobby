// const ENDPOINT = "http://localhost:27017/api/tierlists";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/tierlists`;

const tierlistTypes = ["S", "A", "B", "C", "D"];

export default function patchTierlist({ body = {}, category, jwt }) {
  if (!tierlistTypes.includes(category)) return undefined;
  return fetch(`${ENDPOINT}/${category}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
    method: "PATCH",
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res)
    .catch((error) => console.error(error));
}
