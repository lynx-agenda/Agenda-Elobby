import React from "react";

import types from "../../lib/types.enum";
import Movie from "../Movies/Movie/Movie";
import TVShow from "../TV/TVShow/TVShow";
import Game from "../Games/Game/Game";
import Book from "../Books/Book/Book";

export default function CardSwitch(props) {
  const { type, element } = props;

  const switchCardRender = () => {

    switch (type) {
      case types.movies:
        return (
          <Movie
            id={element.id}
            original_title={element.original_title}
            overview={element.overview}
            poster_path={element.poster_path}
            isHorizontal
          />
        );
      case types.books:
        return (
          <Book
            title={
              element.volumeInfo.title !== undefined
                ? element.volumeInfo.title
                : "Título"
            }
            image={
              element.volumeInfo.imageLinks?.thumbnail !== undefined
                ? element.volumeInfo.imageLinks.thumbnail
                : "Thumbnail"
            }
            desc={
              element.volumeInfo.description !== undefined
                ? element.volumeInfo.description
                : "Description"
            }
            authors={
              element.volumeInfo.authors !== undefined
                ? element.volumeInfo.authors
                : "Authors"
            }
            id={element.id !== undefined ? element.id : "id"}
            key={element.id !== undefined ? element.id : "id"}
            isHorizontal
          />
        );
      case types.games:
        return (
          <Game
            name={element.name}
            img={element.background_image}
            id={element.id}
            isHorizontal
          />
        );
      case types.tv:
        return (
          <TVShow
            id={element.id}
            original_name={element.original_name}
            overview={element.overview}
            poster_path={element.poster_path}
            isHorizontal
          />
        );
      default:
        return null;
    }
  };

  return switchCardRender();
}
