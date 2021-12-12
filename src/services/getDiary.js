import parseJwt from "./parseJwt";

// const ENDPOINT = "http://localhost:27017/api/diaries";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/diaries`;

export default function getDiary({ jwt }) {
  let user = parseJwt(jwt);
  return fetch(`${ENDPOINT}/${user.userId}/${user.userDiary}`, {
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
