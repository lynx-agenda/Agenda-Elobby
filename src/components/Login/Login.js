import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import { BiUser, BiKey } from "react-icons/bi";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import logo from "../../img/lince.png"
import LoginGoogle from "./LoginGoogle";


export default function Login(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {login, error, setError} = useUser();
    const [checkRemember, setCheckRemember] = useState(false)
    let navigate = useNavigate();

    const handlerSubmitUser = (e) => {
        e.preventDefault();
        if(email!=="" && password!==""){
            login({email, password, checkRemember});
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
                                <Form.Check size="lg" type="checkbox" label="Recuérdame" onChange={() => setCheckRemember(!checkRemember)} />
                            </Form.Group>
                            <div className="d-flex flex-column justify-content-center">
                                <Button variant="light" type="submit">
                                    Entrar
                                </Button>
                                <Button variant="outline-light" type="button" className="mt-2" onClick={() => navigate("/Singup")}>
                                    Crear cuenta
                                </Button>
                            </div>
                            {/* <LoginGoogle /> */}
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    )
}