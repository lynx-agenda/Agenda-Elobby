const ENDPOINT = "http://localhost:27017/api/users"

export default function getUser({email, jwt}){
    return fetch(`${ENDPOINT}/${email}` , {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
    }).then(res => {
        return res.json()
    }).then(res => res)
    .catch(error => console.log(error))
}