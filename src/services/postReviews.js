import parseJwt from "./parseJwt";

const ENDPOINT = `${process.env.REACT_APP_BACKEND_HOST}`;
// const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/elements"


export default function postReview({idApi, note, text, type, jwt}){
    return fetch(`${ENDPOINT}/api/elements` , {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
        method: "POST",
        body: JSON.stringify({type,idApi})
    }).then(res => {
        return res.json()
    }).then(res => {
        let idElement = res.element._id;
        return createReview({note, idElement, text, jwt})
            .then(res2 => res2);
    })
    .catch(error => console.error(error))
}

function createReview({note,idElement,text,jwt}){
    let user = parseJwt(jwt);
    return fetch(`${ENDPOINT}/api/reviews/${user.userId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
        method: "POST",
        body: JSON.stringify({note,idElement,text})
    }).then(res => res.json())
    .catch(error => console.error(error))
}