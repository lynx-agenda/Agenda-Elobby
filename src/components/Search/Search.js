import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { createAutocomplete } from "@algolia/autocomplete-core";

import debounced from "../../lib/debounced";
import queryApi from "../../lib/queryApi";
import type from "../../lib/types.enum";
import CardSwitch from "../CardSwitch/CardSwitch";

export default function Search(props) {
  let navigate = useNavigate();
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const elementType = props.url?.split("/")[1];

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      let sendText = inputRef.current.value.trim().split(" ").join("-");
      navigate(`${props.url}${sendText}`);
    }
  };

  const handleApiSearch = async (query) => {
    try {
      const response = await queryApi({
        text: query,
        type: elementType,
      });
      return elementType === type.books ? response.items : response.results;
    } catch (e) {
      console.error("Error fetching api:", e.message);
    }
  };

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Search...",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () =>
          debounced([
            {
              sourceId: "",
              getItems: ({ query }) => {
                if (!!query) {
                  return handleApiSearch(query);
                }
              },
            },
          ]),
      }),
    []
  );

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <div style={{ position: "relative" }}>
      <form ref={formRef} {...formProps}>
        <InputGroup>
          <InputGroup.Text id="search">
            <BiSearch />
          </InputGroup.Text>
          <FormControl
            ref={inputRef}
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search"
            {...inputProps}
          />
          <Button variant="primary" type="submit" onMouseDown={handleSearch}>
            Buscar
          </Button>
        </InputGroup>
      </form>
      {autocompleteState.isOpen && (
        <div
          className="shadow"
          style={{
            width: "100%",
            backgroundColor: " rgba(200, 200, 200, 0.8)",
            borderRadius: "5px",
            position: "absolute",
            zIndex: "99",
            maxWidth: "100%",
          }}
          ref={panelRef}
          {...autocomplete.getPanelProps()}
        >
          {autocompleteState.collections?.[0]?.items
            ?.slice(0, 5)
            .map((element, index) => (
              <CardSwitch key={index} type={elementType} element={element} />
            ))}
        </div>
      )}
    </div>
  );
}

/* {(elementType === type.books ? response.items : response.results)
          ?.slice(0, 5)
          .map((element) => (
            <CardSwitch type={elementType} element={element} />
          ))} */
/**
 *   const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Search...",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () =>
          debounced([
            {
              sourceId: type.books,
              getItems: ({ query }) => {
                if (!!query) {
                  return queryApi({
                    text: query,
                    type: type.books,
                  }).then((response) =>
                    elementType === type.books
                      ? response.items
                      : response.results
                  );
                }
              },
            },
            {
              sourceId: type.tv,
              getItems: ({ query }) => {
                if (!!query) {
                  return queryApi({
                    text: query,
                    type: type.tv,
                  }).then((response) =>
                    elementType === type.books
                      ? response.items
                      : response.results
                  );
                }
              },
            },
            {
              sourceId: type.games,
              getItems: ({ query }) => {
                if (!!query) {
                  return queryApi({
                    text: query,
                    type: type.games,
                  }).then((response) =>
                    elementType === type.books
                      ? response.items
                      : response.results
                  );
                }
              },
            },
          ]),
      }),
    []
  );
 */
