import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";

export default function Search(props) {
    const [text, setText] = useState('');
    let navigate = useNavigate();

    const handlerSearch = (e) => {
        e.preventDefault();
        if(text.trim()!==''){
            let sendText = text.trim().split(' ').join('-');
            navigate(`${props.url}${sendText}`);
            setText('');
        }
    }

    const handlerInputText = (event) => {
        setText(event.target.value);
    }

    return (
        <form onSubmit={handlerSearch} >
            <InputGroup className="mb-4">
                <InputGroup.Text id="search"><BiSearch /></InputGroup.Text>
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search"
                    onChange={handlerInputText}
                    value={text}
                />
                <Button variant="primary" type="submit">Buscar</Button>{' '}
            </InputGroup>
        </form>
    )

}