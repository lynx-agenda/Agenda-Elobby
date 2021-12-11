import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Card } from "react-bootstrap";
import "../../Agenda/Agenda.css";
import "../index.css"

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

  const handlerClickBook = () => {
    navigate(`/Books/View/${props.id}`);
  };

  return (
    <SSRProvider>
      <Card onClick={handlerClickBook} className="book-item">
        <Card.Img variant="top" alt={book.title} src={book.image} />
        <Card.Body>
          <Card.Title>{
            book.title?.length < 40
            ? book.title
            : book.title.slice(0, 40) + '...'
            }</Card.Title>
          <Card.Text>{book.authors}</Card.Text>
        </Card.Body>
      </Card>
    </SSRProvider>
  );
}
