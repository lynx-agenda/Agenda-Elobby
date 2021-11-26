const ENDPOINT = "http://localhost:27017/auth"

export default function singup({name , email, username, password, repeatPassword}){
    return fetch(`${ENDPOINT}/signup` , {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({name, email, username, password, repeatPassword})
    }).then(res => {
        return res.json()
    }).then(res => {
        console.log("Dentro " + res);
        return res;
    }).catch(error => console.log(error))
}