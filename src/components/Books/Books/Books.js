import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { getBooksFromThird } from "../../../services/getFromThirdApis";

import "../index.css";

import Search from "../../Search/Search";
import BookCard from "../Book/Book";

import SSRProvider from "react-bootstrap/SSRProvider";
import Button from "react-bootstrap/Button";
import Loading from "../../Loading/Loading";
import Alert from "react-bootstrap/Alert";

import FormControl from "react-bootstrap/FormControl";

/**
 * La función realiza una petición a Google Books API especificando un subject
 * @param {aquí se especifica la categoría de búsqueda} props
 * @returns Un componente con libros :D
 */
function BooksData(props) {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [page, setPage] = useState(1);

  const maxResults = 16;

  let searchQuery = "";

  let navigate = useNavigate();

  if (props.intitle) searchQuery += `intitle:${props.intitle}`;
  if (props.subject) searchQuery += `+subject:${props.subject}`;

  useEffect(() => {
    async function getData() {
      try {
        const response = await getBooksFromThird({
          q: searchQuery,
          maxResults: maxResults,
          startIndex: startIndex,
        });

        const data = await response;

        setData(data);
        setFetching(false);
        setResponse(response);
      } catch (err) {
        setError(err);
        setFetching(false);
        setResponse(response);

        return;
      }
    }

    if (fetching) {
      getData();
    }
  });

  if (error !== null) {
    return (
      <Alert variant="danger">
        {error.name}: {error.message}
      </Alert>
    );
  }

  if (fetching) {
    return <Loading />;
  }

  if (data === null || data.items === undefined) {
    return (
      <Alert variant="warning">
        No se han encontrado libros en la categoría: <b>{props.subject}</b>
      </Alert>
    );
  }

  const nextPage = () => {
    navigate(`/Books/Page/${+page + 1}`);

    setPage(page + 1);
    setStartIndex(maxResults + maxResults * (page - 1));
    setFetching(true);
  };

  const previousPage = () => {
    if (page > 1) {
      navigate(`/Books/Page/${+page - 1}`);
      setPage(page - 1);
    }

    setStartIndex(startIndex - maxResults * (page - 1));
    setFetching(true);
  };

  const PaginationBasic = () => {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="primary"
          onClick={previousPage}
          disabled={startIndex === 0 || fetching}
        >
          Anterior
        </Button>

        <FormControl className="mx-2" type="number" value={page} disabled />

        <Button
          variant="primary"
          onClick={nextPage}
          disabled={data.totalItems <= data.items.length || fetching}
        >
          Siguiente
        </Button>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        {data.items.map((item) => {
          return (
            <div
              key={item.id}
              className="col-12 col-md-6 col-lg-3 mt-4 d-flex justify-content-center"
            >
              <BookCard
                title={
                  item.volumeInfo.title !== undefined
                    ? item.volumeInfo.title
                    : "Título"
                }
                image={
                  item.volumeInfo.imageLinks?.large !== undefined
                    ? item.volumeInfo.imageLinks.large
                    : item.volumeInfo.imageLinks?.thumbnail !== undefined
                    ? item.volumeInfo.imageLinks.thumbnail
                    : "Thumbnail"
                }
                authors={
                  item.volumeInfo.authors !== undefined
                    ? item.volumeInfo.authors
                    : "Authors"
                }
                id={item.id !== undefined ? item.id : "id"}
                key={item.id !== undefined ? item.id : "id"}
              />
            </div>
          );
        })}
      </div>
      <div className="card-group-buttons">
        <PaginationBasic />
      </div>
    </div>
  );
}

function Books() {
  const { page } = useParams();

  return (
    <SSRProvider>
      <section className="py-5 marginNav">
        <div className="container">
          <Search url="/Books/Browser/" />
          <BooksData subject="Fiction" key="Fiction" page={page} />
        </div>
      </section>
    </SSRProvider>
  );
}

export default Books;
