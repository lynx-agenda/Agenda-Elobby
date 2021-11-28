import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Singup.css"
import singup from "../../services/singup";

export default function Singup(){
    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passCkeck, setPassCkeck] = useState(false);
    const [msg, setMsg] = useState("");
    const handlerSubmitNewUser = (e) => {
        e.preventDefault();
        if (password===repeatPassword){
            setPassCkeck(false);
            setMsg("");
            singup({name,email,username,password,repeatPassword})
                .then(res =>{
                    if (res.success){
                        navigate("/");
                    }else {
                        setMsg(res.message)
                    }
                })
                .catch(error => console.log(error))
        }else {
            setPassCkeck(true);
            setMsg("Las contraseñas no coinciden")
        }
    }

    return (
        <main>
            {msg!=="" ? <Alert className="fixed-top" variant="danger" onClose={() => setMsg("")} dismissible>{msg}</Alert> : null}
            <div className="singup">
                <div className="container d-flex justify-content-center ">
                    <div className="user_card">
                        <h3 className="text-center pb-2">Crear cuenta</h3>
                        <Form onSubmit={handlerSubmitNewUser}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                {passCkeck ? 
                                    <Form.Control  type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required isInvalid/> :
                                    <Form.Control  type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="repeatpassword">
                                <Form.Label>Repite contraseña</Form.Label>
                                {passCkeck ?
                                    <Form.Control  type="password" placeholder="Repite contraseña" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required isInvalid/> :
                                    <Form.Control  type="password" placeholder="Repite contraseña" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required/>
                                }
                            </Form.Group>
                            <div className="d-flex flex-column justify-content-center">
                                <Button variant="light" type="submit">
                                    Registrarte
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
}