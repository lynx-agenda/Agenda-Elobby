import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import "bootstrap/dist/css/bootstrap.min.css";

import Loading from "../../Loading/Loading";

/**
 * @returns Componente con la vista con la información de un libro buscado a partir 
 * de su ID en la API de Google Books
 */
export default function ViewBook() {
  const { id } = useParams();

  const [fetching, setFetching] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		async function getData() {
			try {
				const response = await fetch("https://www.googleapis.com/books/v1/volumes/" + id);

				const data = await response.json();

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

	if (data === null) {
		return (
			<Alert variant="warning">
				No se han encontrado ningún libro con el ISBN: <b>{id}</b>
			</Alert>
		);
	}

  return (
    <section className="py-5 marginNav">
      <div className="container">
        <article>
          <h3 className="my-4">{data.volumeInfo.title }</h3>
          <Image src={
								data.volumeInfo.imageLinks?.large !== undefined
									? data.volumeInfo.imageLinks.large
									: data.volumeInfo.imageLinks?.thumbnail !== undefined
									? data.volumeInfo.imageLinks.thumbnail
									: "Thumbnail"
							} fluid rounded />
          <h4 className="my-4">Descripción</h4>
          <p>{ReactHtmlParser(data.volumeInfo.description)}</p>
        </article>
      </div>
    </section>
  );
}
