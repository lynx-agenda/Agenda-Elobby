// const ENDPOINT = "http://localhost:27017/auth";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/auth`;

export default function login({ email, password }) {
  return fetch(`${ENDPOINT}/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let { token } = res;
      if (token === undefined) token = null;
      return token;
    })
    .catch((error) => console.error(error));
}
