import React, { useEffect } from "react";
import Header from "./components/Header";
import MainPage from "./Pages/MainPage";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import FilmDetails from "./Pages/FilmDetails";
import AllFilms from "./Pages/AllFilms";
import { useGetTrendsQuery } from "./api/movie.api";
import Actors from "./Pages/Actors";
import ActorDetails from "./Pages/ActorDetails";




function App() {  
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/films" element={<AllFilms/>}/>
        <Route path="/film/:id" element={<FilmDetails/>}/>
        <Route path="/actors" element={<Actors/>}/>
        <Route path="/actor/:id" element={<ActorDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
