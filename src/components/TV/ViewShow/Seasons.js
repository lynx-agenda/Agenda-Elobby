import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css";

import Loading from "../../Loading/Loading";
import Season from "./Season"

export default function Seasons(props) {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [season, setSeason] = useState('1');
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=d6c7a342258732312d949314913635e7`;
  const seasons = []
  for(let k=1; k<=props.numberOfSeasons; k++){
    seasons.push(k)
  }

  useEffect(() => {
    async function getData() {
      try {
        let response = await fetch(url);
        response = await response.json();
        setResponse(response);
        setLoading(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    getData();
  }, [url]);

  if (!loading) {
    return <Loading />;
  }

  return (
      <section>
        <h2>Temporadas</h2>
        <Tabs
        id="season-tabs"
        activeKey={season}
        onSelect={(key) => setSeason(key)}
        className="mb-3">
        {
            seasons.map((s, idx) => <Tab eventKey={s} title={s} key={idx}>
                                <Season id={response.id}
                                name={response.name}
                                episodes={response.episodes}/>
                            </Tab>)
        }
        </Tabs>
      </section>
  )
}
