import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image'

import 'bootstrap/dist/css/bootstrap.min.css';

import Loading from '../../Loading/Loading'

export default function ViewGame(){
    const { id } = useParams();
    const [game, setGame] = useState({});
    const [fetchend, setFetchend] = useState(false);
    console.log(id);
    const url = `https://api.rawg.io/api/games/${id}?key=f65e3ff64bf5436f83b6ba0f8b83ac3b`;

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch(url)
                response = await response.json()
                setGame(response) 
                setFetchend(true)
            }catch(e){
                window.location.href = "/NotFound"
            }
        }
        fetchData();
}, [url])

if (!fetchend) {
    return (<Loading />);
}

if(game.detail==="Not found.") window.location.href = "/NotFound";

console.log(game);

    return (
        <section className="py-5 marginNav">  
        <div className="container">
            <article>
                <h3 className="my-4">{game.name}</h3>
                <Image src={game.background_image} fluid  rounded />
                <h4 className="my-4">Descripcion</h4>
                <p>{game.description}</p>
                <div className="row">
                    <div className="col-6">
                        <p><strong>Nota: </strong>{game.metacritic}</p>
                    </div>
                    <div className="col-6">
                        <p><strong>Fecha: </strong>{game.released}</p>
                    </div>
                    <div className="col-12">
                        <p><strong>Fecha: </strong>{game.website}</p>
                    </div>
                </div>
            </article>
            
        </div>
        </section>
        
    )
}