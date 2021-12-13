import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Card } from "react-bootstrap";
import "../../Agenda/Agenda.css";
import "../index.css"
import { useState } from "react";

/**
 * @param {los parámetros del libro que queremos añadir a la card} props
 * @returns Una card con la portada y algunas cosas más que le queramos añadir
 */
export default function BookCard(props) {

  let navigate = useNavigate();
  const book = {
    img: "",
    title: "",
    authors: "",
  };

  if (props.image) book.image = props.image;
  if (props.title) book.title = props.title;
  if (props.authors) book.authors = props.authors;

  const [srcImage, setSrcImage] = useState(book.image);
  const cardStyle = { cursor: "pointer" };
  const imageStyle = { display: !srcImage ? "none" : "inherit" };

  const handlerClickBook = () => {
    navigate(`/Books/View/${props.id}`);
  };

  return (
    <SSRProvider>
      <Card onClick={handlerClickBook} className={props.isHorizontal ? null : "book-item"}  style={
        props.isHorizontal
          ? {
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "50px",
              maxHeight: "50px",
              ...cardStyle,
            }
          : cardStyle
      }>
        <Card.Img onError={(_e) => {setSrcImage(undefined);}} variant="top" alt={book.title} src={srcImage} style={
          props.isHorizontal ? { width: "40px", borderRadius: 0, ...imageStyle} : imageStyle
        } />
        <Card.Body>
          <Card.Title>{
            book.title?.length < 40
            ? book.title
            : book.title.slice(0, 40) + '...'
            }</Card.Title>
          {props.isHorizontal ? null : <Card.Text>{book.authors}</Card.Text>}
        </Card.Body>
      </Card>
    </SSRProvider>
  );
}
