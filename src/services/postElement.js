import addToDiary from "./addToDiary"

const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/elements"

export default function postElement({idApi, status, type, jwt}){
    return fetch(`${ENDPOINT}` , {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
        method: "POST",
        body: JSON.stringify({type,idApi})
    }).then(res => {
        return res.json()
    }).then(res => {
        console.log(res);
        let idElement = res.element._id;
        return addToDiary({idElement, status, jwt})
            .then(res2 => res2);
    })
    .catch(error => console.log(error))
}