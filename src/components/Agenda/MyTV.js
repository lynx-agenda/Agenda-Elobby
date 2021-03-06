import "./Agenda.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DiaryCard from "./DiaryCard";
import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { getFromTheMovieDB, getGamesFromThird } from "../../services/getFromThirdApis";
import getDiary from "../../services/getDiary";
import Loading from "../Loading/Loading";

export default function MyTV() {
  const { jwt } = useUser();
  const [watching, setWatching] = useState([]);
  const [pending, setPending] = useState([]);
  const [dropped, setDropped] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
			try {
				const diary = await getDiary({jwt})

        const allPromiseCompleted =  diary.completed.map(element => {
          if(element.type==="game") return getGamesFromThird({ idResource: `${element.idApi}` , typeElobby: "game"}); 
          if(element.type==="movie") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "movie", typeElobby: "movie" })
          if(element.type==="tv") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "tv", typeElobby: "tv"})
          if(element.type==="book") {
            return fetch("https://www.googleapis.com/books/v1/volumes/" + element.idApi).then((res) => res.json()).then((res) => {
              res.typeElobby = 'book'
              return res
            })
          } else return null
      })

        const allPromiseWatching =  diary.watching.map(element => {
          if(element.type==="game") return getGamesFromThird({ idResource: `${element.idApi}` , typeElobby: "game"}); 
          if(element.type==="movie") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "movie", typeElobby: "movie" })
          if(element.type==="tv") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "tv", typeElobby: "tv"})
          if(element.type==="book") {
            return fetch("https://www.googleapis.com/books/v1/volumes/" + element.idApi).then((res) => res.json()).then((res) => {
              res.typeElobby = 'book'
              return res
            })
          } else return null
      })

        const allPromiseDropped =  diary.dropped.map(element => {
          if(element.type==="game") return getGamesFromThird({ idResource: `${element.idApi}` , typeElobby: "game"}); 
          if(element.type==="movie") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "movie", typeElobby: "movie" })
          if(element.type==="tv") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "tv", typeElobby: "tv"})
          if(element.type==="book") {
            return fetch("https://www.googleapis.com/books/v1/volumes/" + element.idApi).then((res) => res.json()).then((res) => {
              res.typeElobby = 'book'
              return res
            })
          }else return null
      })

        const allPromisePending =  diary.pending.map(element => {
          if(element.type==="game") return getGamesFromThird({ idResource: `${element.idApi}` , typeElobby: "game"}); 
          if(element.type==="movie") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "movie", typeElobby: "movie" })
          if(element.type==="tv") return getFromTheMovieDB({ idResource: `${element.idApi}`, resourceType: "tv", typeElobby: "tv"})
          if(element.type==="book") {
            return fetch("https://www.googleapis.com/books/v1/volumes/" + element.idApi).then((res) => res.json()).then((res) => {
              res.typeElobby = 'book'
              return res
            })
          }else return null
      })

      Promise.all(allPromiseCompleted).then(res => {
        setCompleted(res);
        Promise.all(allPromiseWatching).then(res => {
          setWatching(res);
          Promise.all(allPromiseDropped).then(res => {
            setDropped(res);
            Promise.all(allPromisePending).then(res => {
              setPending(res);
              setLoading(false);
            }).catch(error => console.error(error))
          })
        })
      }).catch(error => console.error(error))
      

			} catch (e) {
				// window.location.href = "/NotFound";
        console.error(e);
			}
		}
		fetchData();
  },[jwt])

  if (loading) {
    return <Loading />;
  }
  return (
    <section className=" py-5 marginNav">
      <div className="container">
        <div className={watching.some(el => el.typeElobby === 'tv') ? "state-section" : "invisible"}>
          <h2>Siguiendo</h2>
            {watching.map((item) => {
              if(item.typeElobby === 'tv'){
                return(
                  <div key={item.id} className="col-12 col-md-6 col-lg-3 mt-4 d-flex justify-content-center">
                    <DiaryCard elemento={item} />
                  </div>
                )
              } else return null;
            })}
        </div>
        <div className={pending.some(el => el.typeElobby === 'tv') ? "state-section" : "invisible"}>
          <h2>Pendiente</h2>
          {pending.map((item) => {
            if(item.typeElobby === 'tv'){
              return(
                  <div key={item.id} className="col-12 col-md-6 col-lg-3 mt-4 d-flex justify-content-center">
                    <DiaryCard elemento={item} />
                  </div>
                )
              } else return null;
            })}
        </div>
        <div className={completed.some(el => el.typeElobby === 'tv') ? "state-section" : "invisible"}>
          <h2>Terminado</h2>
          {completed.map((item) => {
            if(item.typeElobby === 'tv'){
              return(
                  <div key={item.id} className="col-12 col-md-6 col-lg-3 mt-4 d-flex justify-content-center">
                    <DiaryCard elemento={item} />
                  </div>
                )
              } else return null;
            })}
        </div>
        <div className={dropped.some(el => el.typeElobby === 'tv') ? "state-section" : "invisible"}>
          <h2>Abandonado</h2>
          {dropped.map((item) => {
            if(item.typeElobby === 'tv'){
              return(
                  <div key={item.id} className="col-12 col-md-6 col-lg-3 mt-4 d-flex justify-content-center">
                    <DiaryCard elemento={item} />
                  </div>
                )
              } else return null;
            })}
        </div>
      </div>
    </section>
  );
}
