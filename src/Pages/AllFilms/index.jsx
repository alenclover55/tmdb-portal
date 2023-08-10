import React, { useCallback, useEffect, useState } from "react";
import {
  useGetAllMoviesQuery,
  useGetSearchMovieQuery,
} from "../../api/movie.api";
import { Link } from "react-router-dom";
import cl from "./AllFilms.module.scss";
import { Pagination } from "antd";
import debounce from "lodash.debounce";

function AllFilms() {
  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState("now_playing");
  const [search, setSearch] = useState("");
  const [updatedSearch, setUpdatedSearch] = useState("");
  const { data, isLoading, isSuccess } = useGetSearchMovieQuery({
    currentPage,
    updatedSearch,
  });
  const {
    data: allMovies,
    isLoading: isLoadingFilm,
    isSuccess: isSuccessFilm,
  } = useGetAllMoviesQuery({ currentPage, type });

  const handlerMenu = (menuType) => {
    setType(menuType);
    setCurrentPage(1);
    setUpdatedSearch("");
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
    scrollTo(0, 0);
  };

  const onUpdateSearch = useCallback(
    debounce(
      (str) => {
        setUpdatedSearch(str);
      },
      [350]
    ),
    []
  );
  const searchClear = () =>{
    setSearch("")
  }
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    onUpdateSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="container wrapperInput">
          <h3>Поиск</h3>
          <div>
            <input
              value={search}
              onChange={(e) => onChangeSearch(e)}
              className="searchInput"
              type="text"
            />
            {updatedSearch.length > 0 && <img width={30} src="./delete-btn.svg" alt="" />}
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <ul className={cl.allFilmMenu}>
            <li
              className={type === "now_playing" ? cl.active : ""}
              onClick={() => handlerMenu("now_playing")}
            >
              Сейчас смотрят
            </li>
            <li
              className={type === "popular" ? cl.active : ""}
              onClick={() => handlerMenu("popular")}
            >
              Популярные
            </li>
            <li
              className={type === "top_rated" ? cl.active : ""}
              onClick={() => handlerMenu("top_rated")}
            >
              Высокий рейтинг
            </li>
            <li
              className={type === "upcoming" ? cl.active : ""}
              onClick={() => handlerMenu("upcoming")}
            >
              Ожидаемые
            </li>
          </ul>
        </div>
        {updatedSearch.length > 0 ? (
          <div className={cl.filmsList}>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data.results.map((item) => (
                <Link key={item.id} to={`/film/${item.id}`}>
                  <div>
                    <img
                      width={150}
                      src={
                        item.poster_path
                          ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`
                          : "./not-img.jpg"
                      }
                    />
                    <h3>{item.title}</h3>
                    <p>{item.release_date}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        ) : (
          <div className={cl.filmsList}>
            {isLoadingFilm ? (
              <div>Loading...</div>
            ) : (
              allMovies.results.map((item) => (
                <Link key={item.id} to={`/film/${item.id}`}>
                  <div>
                    <img
                      width={150}
                      src={
                        item.poster_path
                          ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`
                          : "./not-img.jpg"
                      }
                    />
                    <h3>{item.title}</h3>
                    <p>{item.release_date}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        <div className="pagination">
          {updatedSearch.length > 0 ? (
            <Pagination
              showSizeChanger
              pageSizeOptions={[1]}
              defaultPageSize={1}
              showQuickJumper={(count) => "Всего страниц: " + count}
              showTotal={(total) => `Текущее число страниц: < ${total} >`}
              current={currentPage}
              onChange={onPageChange}
              total={isSuccess && data.total_pages}
            />
          ) : (
            <Pagination
              showSizeChanger
              pageSizeOptions={[1]}
              defaultPageSize={1}
              showQuickJumper={(count) => "Всего страниц: " + count}
              showTotal={(total) => `Текущее число страниц: < ${total} >`}
              current={currentPage}
              onChange={onPageChange}
              total={isSuccessFilm && allMovies.total_pages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AllFilms;
