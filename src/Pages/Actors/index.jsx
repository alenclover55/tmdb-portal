import React, { useState, useCallback } from "react";
import cl from "./Actors.module.scss";
import {
  useGetAllActorsQuery,
  useGetSearchActorsQuery,
} from "../../api/movie.api";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

function Actors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [updatedSearch, setUpdatedSearch] = useState("");
  const { data , isSuccess} = useGetSearchActorsQuery({ currentPage, updatedSearch });
  const {
    data: actors,
    isLoading,
    isSuccess: isSuccessActors,
    isError
  } = useGetAllActorsQuery(currentPage);

  const onUpdateSearch = useCallback(
    debounce(
      (str) => {
        setUpdatedSearch(str);
      },
      [600]
    ),
    []
  );
  const searchClear = () => {
    setUpdatedSearch("");
    setSearch('')
  };
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    onUpdateSearch(e.target.value);
  };

  const handlerMenu = (menuType) => {
    setType(menuType);
    setCurrentPage(1);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
    scrollTo(0, 0);
  };
  if(isLoading){
    return(<h1>Loading...</h1>)
  }
  if(isError){
    return(<h1>Error</h1>)
  }

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
            {updatedSearch.length > 0 && (
              <img
                onClick={() => searchClear()}
                width={30}
                src="./delete-btn.svg"
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <div className="container">
        {updatedSearch.length > 0 ? (
          <div className={cl.actorsList}>
            {data.results.map((actor) => (
              <Link key={actor.id} to={`/actor/${actor.id}`}>
                <div
                  className="actorCard"
                  style={{
                    background: `url(${
                      actor.profile_path
                        ? `'https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}'`
                        : "../not-img.jpg"
                    })`,
                  }}
                >
                  <div className="cardPreview">
                    <p>{actor.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={cl.actorsList}>
            {actors.results.map((actor) => (
              <Link key={actor.id} to={`/actor/${actor.id}`}>
                <div
                  className="actorCard"
                  style={{
                    background: `url(${
                      actor.profile_path
                        ? `'https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}'`
                        : "../not-img.jpg"
                    })`,
                  }}
                >
                  <div className="cardPreview">
                    <p>{actor.name}</p>
                  </div>
                </div>
              </Link>
            ))}
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
              total={isSuccessActors && actors.total_pages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Actors;
