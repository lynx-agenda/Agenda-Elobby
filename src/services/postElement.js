import addToDiary from "./addToDiary"

const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}/api/elements`;
// const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/elements"

export default function postElement({idApi, status, type, jwt}){
    return fetch(`${ENDPOINT}` , {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
        method: "POST",
        body: JSON.stringify({type,idApi})
    }).then(res => {
        return res.json()
    }).then(res => {
        let idElement = res.element._id;
        return addToDiary({idElement, status, jwt})
            .then(res2 => res2);
    })
    .catch(error => console.error(error))
}