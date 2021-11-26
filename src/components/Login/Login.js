import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import { BiUser, BiKey } from "react-icons/bi";import './Login.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import logo from "../../img/lince.png"


export default function Login(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {login, isLogged, error, setError} = useUser();
    const [ckeckRemenber, setCkeckRemenber] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        if (isLogged) console.log(isLogged);
    }, [isLogged])

    const handlerSubmitUser = (e) => {
        e.preventDefault();
        if(email!=="" && password!==""){
            if (isLogged) console.log("Ya estas Logeado");
            else login({email, password, ckeckRemenber});
        }
    }

    return (
        <main>
            {error ? <Alert className="fixed-top" variant="danger" onClose={() => setError(false)} dismissible>Usuario o contraseña erronea</Alert> : null}
            <div className="login">
                <div className="container d-flex justify-content-center ">
                    <div className="user_card">
                        <Image src={logo} fluid className="logo d-block mx-auto"/>
                        <Form onSubmit={handlerSubmitUser}>
                            <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
                                <span><BiUser /></span>
                                <Form.Control className="inputs" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex" controlId="formBasicPassword">
                                <span><BiKey /></span>
                                <Form.Control className="inputs" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check size="lg" type="checkbox" label="Recuérdarme" onChange={() => setCkeckRemenber(!ckeckRemenber)} />
                            </Form.Group>
                            <div className="d-flex flex-column justify-content-center">
                                <Button variant="light" type="submit">
                                    Entrar
                                </Button>
                                <Button variant="outline-light" type="button" className="mt-2" onClick={() => navigate("/Singup")}>
                                    Crear cuenta
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    )
}