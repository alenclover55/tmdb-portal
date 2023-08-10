import React from "react";
import { Link, useParams } from "react-router-dom";
import cl from "./FilmDetails.module.scss";
import { useGetFilmCreditsQuery, useGetFilmQuery } from "../../api/movie.api";

export default function FilmDetails() {
  const { id } = useParams();

  const { data: credits } = useGetFilmCreditsQuery(id);
  const { data: film, isLoading } = useGetFilmQuery(id);
  console.log(credits);
  console.log(film);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div>
      {isLoading ? (
        <h1 className="load">Loading...</h1>
      ) : (
        <div>
          <div
            className="backDrop"
            style={{
              background: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${film.backdrop_path}') no-repeat`,
            }}
          >
            <div className="container">
              <div className={cl.poster}>
                <img
                  width={300}
                  height={450}
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`}
                  alt={film.title}
                />
              </div>
              <div className={cl.details}>
                <h1>{film.title}</h1>
                <p className={cl.date}>
                  <span>
                    {film.genres.map((genre) => (
                      <span key={genre.id}>{genre.name}, </span>
                    ))}
                  </span>
                  <br />
                  {film.release_date} <br />
                  <span>Рейтинг: {film.vote_average}</span>
                </p>
                <h3>Обзор</h3>
                <p className={cl.overview}>
                  {film.overview < 1
                    ? "Нет обзора на русском языке"
                    : film.overview}
                </p>
              </div>
              <div className={cl.detailsWrapper}>
                <div className={cl.optional}>
                  <h4>Детали</h4>
                  <p>
                    Cтатус: <span>{film.status}</span>
                  </p>
                  <p>
                    Исходный язык: <span>{film.original_language}</span>
                  </p>
                  <p>
                    Бюджет: <span>{film.budget ? formatter.format(film.budget): '-'}</span>
                  </p>
                  <p>
                    Сборы: <span>{film.revenue ? formatter.format(film.revenue): '-'}</span>
                  </p>
                </div>
                <div className={cl.companiesWrapper}>
                  {film.production_companies.map((companie) => (
                    <div key={companie.id}>
                      {companie.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92/${companie.logo_path}`}
                          alt=""
                        />
                      ) : null}
                      <p>
                        {companie.name}({companie.origin_country})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className={cl.actors}>
                  <h3>Актерский состав</h3>
                  <div className={cl.actorsWrapper}>
                    {credits.cast.map((credit) => (
                      <Link key={credit.id} to={`/actor/${credit.id}`}>
                        <div
                        className="actorCard"
                        style={{
                          background: `url(${
                            credit.profile_path
                              ? `'https://www.themoviedb.org/t/p/w138_and_h175_face/${credit.profile_path}'`
                              : "../not-img.jpg"
                          })`,
                        }}
                      >
                        <div className="cardPreview">
                          <p>{credit.name}</p>
                        </div>
                      </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
