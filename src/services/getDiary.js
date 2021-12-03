import parseJwt from "./parseJwt";

const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/diaries";

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
    .catch((error) => console.log(error));
}