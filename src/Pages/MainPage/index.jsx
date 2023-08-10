import React, { useState } from "react";
import cl from "./MainPage.module.scss";

import { Link } from "react-router-dom";
import { useGetTrendsQuery } from "../../api/movie.api";



function MainPage() {
  const [trendsType, setTrendsType] = useState('day')
  const {data, isLoading, isError, isSuccess} = useGetTrendsQuery(trendsType)
  
  if(isError){
    <h1>Error...</h1>
  }
  if(isLoading){
    <h1>Loading...</h1>
  }

  return (
    <div className="container">
      <div className={cl.SearchBlock}>
        <div className={cl.SearchBlockMask}></div>
        <h1>Добро пожаловать</h1>
        <p>Миллионы фильмов, сериалов и людей. Исследуйте сейчас.</p>
      </div>
      <div className={cl.trends}>
        <div>
          <h2>В тренде</h2>
          <button className={trendsType === 'day'? 'activeType': ''} onClick={()=>setTrendsType('day')} >
            Сегодня
          </button>
          <button className={trendsType === 'week'? 'activeType': ''} onClick={()=>setTrendsType('week')} >
            На этой неделе
          </button>
        </div>
        <div className={cl.trendsList}>
          {isSuccess && data.results.map((item) => (
            <Link key={item.id} to={`/film/${item.id}`}>
              <div>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                />
                <h3>{item.title}</h3>
                <p>{item.release_date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
