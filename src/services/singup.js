// const ENDPOINT = "http://localhost:27017/auth";
const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/auth`;

export default function singup({
  name,
  email,
  username,
  password,
  repeatPassword,
}) {
  return fetch(`${ENDPOINT}/signup`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ name, email, username, password, repeatPassword }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => console.error(error));
}
