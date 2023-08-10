import React from "react";
import { Link } from "react-router-dom";
import {
  useGetActorCreditsFilmsQuery,
  useGetActorDetailsQuery,
} from "../../api/movie.api";
import { useParams } from "react-router-dom";
import cl from "./ActorDetails.module.scss";

function ActorDetails() {
  const { id } = useParams();
  const { data: actor, isLoading: isLoadingActor,isError } =
    useGetActorDetailsQuery(id);
  const { data: creditFilms, isLoading: isLoadingFilms, isSuccess } =
    useGetActorCreditsFilmsQuery(id);
    
    
  if (isLoadingActor) {
    return <h1>Loading...</h1>;
  }
  if (isError){
    return <h1>Error...</h1>
  }
  
  return (
    <div className="container">
      <div className={cl.detailsWrapper}>
        <div className={cl.wrapperPersonal}>
          <img
            width={300}
            height={450}
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`}
            alt=""
          />
          <h3>Персональная информация</h3>
          <div>
            <p>
              Пол: <br />
              <span>
                {actor.gender === 0
                  ? "Пол не определён"
                  : actor.gender === 1
                  ? "Женский"
                  : actor.gender === 2
                  ? "Мужской"
                  : "Недвоичный"}
              </span>
            </p>
            <p>
              Дата рождения: <br />
              <span>{actor.birthday}</span>
            </p>
            <p>
              Место рождения: <br />
              <span>{actor.place_of_birth}</span>
            </p>
            <p>
              Также известен(на) как:
              {actor.also_known_as &&
                actor.also_known_as.map((knowAs) => (
                  <span>
                    <br />
                    {knowAs}
                  </span>
                ))}
            </p>
          </div>
        </div>
        <div>
          <h1>{actor.name}</h1>
          <h2>Биография: </h2>
            <p className={cl.biography}>{actor.biography.length > 0 ? actor.biography: 'Биография появится в скором времени.'}</p>
          <h2>Снимался(лась) в:</h2>
          <div className={cl.filmList}>
            {isSuccess && creditFilms.cast.map(film=>(
            <Link key={film.id} to={`/film/${film.id}`}>
              <div>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${film.poster_path}`}
                />
                <h3>{film.title}</h3>
                <p>{film.release_date}</p>
              </div>
            </Link>
          ))}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActorDetails;
