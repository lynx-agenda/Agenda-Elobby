import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css";

import { getFromTheMovieDB } from "../../../services/getFromThirdApis";

import Loading from "../../Loading/Loading";
import Season from "./Season"

export default function Seasons(props) {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [season, setSeason] = useState('1');
  const seasons = []
  for(let k=1; k<=props.numberOfSeasons; k++){
    seasons.push(k)
  }

  useEffect(() => {
    async function getData() {
      try {

				let response = await getFromTheMovieDB({ idResource: `${id}`, resourceType: "tv", season: `${season}` });

        setResponse(response);
        setLoading(true);
      } catch (e) {
        window.location.href = "/NotFound";
      }
    }
    getData();
  }, [id, season]);

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
