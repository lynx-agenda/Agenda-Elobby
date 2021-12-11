import "bootstrap/dist/css/bootstrap.min.css";
import "./Game.css"
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function Game(props) {
  let navigate = useNavigate();

  const handlerClickGame = () => {
    navigate(`/Games/View/${props.id}`);
  };

  const cardStyle = { cursor: "pointer" };

  return (
      <Card className="card-game"
        onClick={handlerClickGame}
        style={
          props.isHorizontal
            ? {
                display: "flex",
                flexDirection: "row",
                height: "3.125rem",
                maxHeight: "3.125rem",
                ...cardStyle,
              }
            : cardStyle
        }
      >
        <Card.Img
          variant="bottom"
          src={props.img}
          style={props.isHorizontal ? { maxWidth: "6.25rem" } : {}}
        />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
      </Card>
  );
}
