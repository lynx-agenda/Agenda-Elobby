import parseJwt from "./parseJwt"

const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/users"

export default function getUser({jwt}){
    let user = parseJwt(jwt);
    console.log(user);
    return fetch(`${ENDPOINT}/${user.userId}` , {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
    }).then(res => {
        return res.json()
    }).then(res => res)
    .catch(error => console.log(error))
}
