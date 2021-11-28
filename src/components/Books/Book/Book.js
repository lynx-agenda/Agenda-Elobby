import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button'

import "bootstrap/dist/css/bootstrap.min.css";
import SSRProvider from "react-bootstrap/SSRProvider";

/**
 * @param {los parámetros del libro que queremos añadir a la card} props
 * @returns Una card con la portada y algunas cosas más que le queramos añadir
 */
export default function BookCard(props) {
  let navigate = useNavigate();
  const book = {
    img: "",
    title: "",
    desc: "",
    authors: "",
  };

  if (props.image) book.image = props.image;
  if (props.title) book.title = props.title;
  if (props.desc) book.desc = props.desc.slice(0, 44) + "...";
  if (props.authors) book.authors = props.authors;

  const handlerClickBook = () => {
    navigate(`/Books/View/${props.id}`);
  };

  const cardStyle = { cursor: "pointer" };

  return (
    <SSRProvider
      className="mt-4"
      style={
        props.isHorizontal
          ? {
              display: "flex",
              flexDirection: "row",
              height: "50px",
              maxHeight: "50px",
              ...cardStyle,
            }
          : cardStyle
      }
    >
      <div className="card book-container" onClick={handlerClickBook}>
        <div className="book-card">
          <img
            className="book-card-cover"
            src={book.image}
            alt="portada libro"
            style={
              props.isHorizontal ? { width: "inherit", object: "fit" } : {}
            }
          />

          <div className="book-card-body">
            <div className="book-card-body-title">
              <b>{book.title}</b>
            </div>
            {!props.isHorizontal && (
              <div className="book-card-body-desc">{book.desc}</div>
            )}
            {!props.isHorizontal && <br />}
            {!props.isHorizontal && <small>{book.authors}</small>}
            {!props.isHorizontal && <br />}
          </div>
        </div>
        {!props.isHorizontal && (
          <div className="book-card-buttons-group">
            <Button className="book-card-button" variant="dark">
              Ver ficha
            </Button>
            {/* <Button className="book-card-button" variant="success">Agregar</Button> */}
          </div>
        )}
      </div>
    </SSRProvider>
  );
}
