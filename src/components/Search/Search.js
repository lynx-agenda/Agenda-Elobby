<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
=======
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import queryApi from "../../lib/queryApi";
import type from "../../lib/types.enum";
import CardSwitch from "../CardSwitch/CardSwitch";
>>>>>>> origin/develop-lorenzo

export default function Search(props) {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const elementType = props.url?.split("/")[1];
  let navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      let sendText = text.trim().split(" ").join("-");
      navigate(`${props.url}${sendText}`);
      setText("");
    }
  };

  const handleApiSearch = async (query) => {
    try {
      const response = await queryApi({
        text: query,
        type: elementType,
      });
      setResponse(response);
    } catch (e) {
      console.error("Error fetching api:", e.message);
    }
  };

  const debouncedHandleApiSearch = useCallback(
    debounce(handleApiSearch, 500),
    []
  );

  const handleTextInput = async (event) => {
    const query = event.target.value;
    setText(query);
    if (query.length >= 3) {
      debouncedHandleApiSearch(query);
    } else {
      setResponse(null);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSearch}>
        <InputGroup>
          <InputGroup.Text id="search">Lupa</InputGroup.Text>
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search"
            onChange={handleTextInput}
            value={text}
          />
          <Button variant="primary" type="submit">
            Buscar
          </Button>
        </InputGroup>
      </form>
      {response && (
        <div
          style={{
            width: "100%",
            backgroundColor: " rgba(200, 200, 200, 0.8)",
            borderRadius: "5px",
            position: "absolute",
            zIndex: "99",
            maxWidth: "100%",
          }}
        >
          {(elementType === type.books ? response.items : response.results)
            ?.slice(0, 5)
            .map((element) => (
              <CardSwitch type={elementType} element={element} />
            ))}
        </div>
      )}
    </div>
  );
}
