import parseJwt from "./parseJwt";

const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/elements"


export default function postReview({idApi, note, text, type, jwt}){
    return fetch(`${ENDPOINT}` , {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
        method: "POST",
        body: JSON.stringify({type,idApi})
    }).then(res => {
        return res.json()
    }).then(res => {
        console.log(res);
        let idElement = res.element._id;
        console.log({note, idElement, text, jwt})
        return createReview({note, idElement, text, jwt})
            .then(res2 => res2);
    })
    .catch(error => console.log(error))
}

function createReview({note,idElement,text,jwt}){
    let user = parseJwt(jwt);
    console.log(user.userId)
    return fetch(`https://young-badlands-18005.herokuapp.com/api/reviews/${user.userId}`, {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
        method: "POST",
        body: JSON.stringify({note,idElement,text})
    }).then(res => res.json())
    .catch(error => console.log(error))
}