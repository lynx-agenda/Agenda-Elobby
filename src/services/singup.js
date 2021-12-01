const ENDPOINT = "https://young-badlands-18005.herokuapp.com/auth";

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
    .catch((error) => console.log(error));
}
