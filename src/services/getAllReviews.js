
const ENDPOINT = "https://young-badlands-18005.herokuapp.com/api/reviews"

export default function getAllReviews({jwt}){
    return fetch(`${ENDPOINT}` , {
        headers: {"Content-Type": "application/json", "Authorization": `bearer ${jwt}`},
    }).then(res => {
        return res.json()
    }).then(res => res)
    .catch(error => console.log(error))
}
