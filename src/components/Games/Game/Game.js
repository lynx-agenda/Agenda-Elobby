import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';

export default function Game(promps) {
    let navigate = useNavigate();

const handlerClickGame = () => {
    navigate(`/Games/View/${promps.id}`);
}

    return (
        <section>
            <Card onClick={handlerClickGame}>
                <Card.Img variant="top" src={promps.img} />
                <Card.Body>
                    <Card.Title>
                        {promps.name}
                    </Card.Title>
                </Card.Body>
            </Card>
        </section>
    );
}

