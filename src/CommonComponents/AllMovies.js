import React from "react";
import requesets from "./requests";
import Row from "./Row";

function AllMovies({ bookmarkThis, removeBookmark, watchlist }) {
  const rowCatagories = [
    { title: "NETFLIX ORIGINALS", url: requesets.fetchNetflixOriginals },
    { title: "Trending Now", url: requesets.fetchTrending },
    { title: "Top Rated", url: requesets.fetchTopRated },
    { title: "Action Movies", url: requesets.fetchActionMovies },
    { title: "Comedy Movies", url: requesets.fetchComedyMovies },
    { title: "Horror Movies", url: requesets.fetchHorrorMovies },
    { title: "Romance Movies", url: requesets.fetchRomanceMovies },
    { title: "Documentaries", url: requesets.fetchDocumentaries },
  ];

  return (
    <div>
      <>
        {rowCatagories.map((row) => (
          <Row
            isLargeRow={row.title === "NETFLIX ORIGINALS"}
            title={row.title}
            fetchUrl={row.url}
            bookmarkThis={bookmarkThis}
            removeBookmark={removeBookmark}
            watchlist={watchlist}
          />
        ))}
      </>
    </div>
  );
}

export default AllMovies;
