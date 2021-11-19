import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Game from '../Game/Game'
import Search from '../../Search/Search';
import Loading from '../../Loading/Loading'

export default function BrowserGames(){
    const { text } = useParams();
    const [games, setGames] = useState({});
    const [fetchend, setFetchend] = useState(false);
    const url = `https://api.rawg.io/api/games?key=f65e3ff64bf5436f83b6ba0f8b83ac3b&search=${text}&search_precise=true&parent_platforms=1,2,3,7&exclude_additions=true`;

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch(url)
                response = await response.json()
                setGames(response) 
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

    if(games.count===0) {
        return (
            <section className="section py-5 marginNav">
                <div className="container">
                    <h3>Ningun juego encontrado</h3>
                </div>
            </section>
        );
    }else {
        return (
            <section className="py-5 marginNav">
                <div className="container">
                <Search url="/Games/Browser/"/>
                    <div className="row">
                    {games.results.map((element) => { 
                            return <div key={element.id} className="col-12 col-md-4 mt-3"><Game name={element.name} img={element.background_image} id={element.id}/></div>;
                        })}
                    </div>
                </div>
    
            </section>
        );
    }
}