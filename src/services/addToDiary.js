import parseJwt from "./parseJwt";

// const ENDPOINT = "http://localhost:27017/api/diaries";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/diaries`;

export default function addToDiary({ idElement, status, jwt }) {
  let user = parseJwt(jwt);
  return fetch(`${ENDPOINT}/${user.userId}/${user.userDiary}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${jwt}`,
    },
    method: "PATCH",
    body: JSON.stringify({ idElement, status }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res)
    .catch((error) => console.error(error));
}
