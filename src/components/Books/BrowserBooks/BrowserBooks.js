import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import {getBooksFromThird} from "../../../services/getFromThirdApis";
import queryApi from "../../../lib/queryApi";

import BookCard from "../Book/Book";
import Search from "../../Search/Search";
import Loading from "../../Loading/Loading";

import Alert from "react-bootstrap/Alert";
import { SSRProvider } from "react-bootstrap";
import type from "../../../lib/types.enum";

export default function BrowserBooks() {
  const { text } = useParams();
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const startIndex = 0;

  let searchQuery = `intitle:${text}`;

  useEffect(() => {
    async function getData() {
      try {
        const response = await queryApi({
          text: searchQuery,
          startIndex: startIndex,
          type: type.books,
        });

        setData(response);
        setFetching(false);
      } catch (err) {
        setError(err);
        setFetching(false);

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
        No se han encontrado libros para el término de búsqueda: <b>{text}</b>
      </Alert>
    );
  }

  return (
    <SSRProvider>
      <section className="py-5 marginNav">
        <div className="container">
          <Search url="/Books/Browser/" />
          <div className="row">
            <div className="card-group">
              {data.items.map((item) => {
                return (
                  <BookCard
                    title={
                      item.volumeInfo.title !== undefined
                        ? item.volumeInfo.title
                        : "Título"
                    }
                    image={
                      item.volumeInfo.imageLinks?.thumbnail !== undefined
                        ? item.volumeInfo.imageLinks.thumbnail
                        : "Thumbnail"
                    }
                    desc={
                      item.volumeInfo.description !== undefined
                        ? item.volumeInfo.description
                        : "Description"
                    }
                    authors={
                      item.volumeInfo.authors !== undefined
                        ? item.volumeInfo.authors
                        : "Authors"
                    }
                    id={item.id !== undefined ? item.id : "id"}
                    key={item.id !== undefined ? item.id : "id"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </SSRProvider>
  );
}
