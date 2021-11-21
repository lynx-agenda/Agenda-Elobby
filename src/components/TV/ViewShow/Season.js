import { ListGroup } from "react-bootstrap";

export default function Season(props) {

  if(props.episodes.length === 0){
    return (
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          Aún no hay episodios
        </ListGroup.Item>
    </ListGroup>
    )
  }
  return (
    <ListGroup as="ul">
      {props.episodes.map((ep) => (
        <ListGroup.Item as="li" key={ep.id}>
          {ep.episode_number} - {ep.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
