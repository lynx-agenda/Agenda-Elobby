const ENDPOINT = "https://localhost:8000"

export default function login({email , password}){
    return fetch(`${ENDPOINT}/login` , {
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const { jwt } = res;
        return jwt;
    })
}