import parseJwt from "./parseJwt";

const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/users`;
// const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/users";

export default function getUser({ jwt }) {
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
