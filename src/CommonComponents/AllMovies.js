import React, { useEffect } from "react";
import requesets from "./requests";
import Row from "./Row";

function AllMovies({ bookmarkThis, removeBookmark, watchlist }) {
  return (
    <div>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requesets.fetchNetflixOriginals}
        isLargeRow
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
      />
      <Row
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        fetchUrl={requesets.fetchTrending}
        watchlist={watchlist}
        title="Trending Now"
      />
      <Row
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        fetchUrl={requesets.fetchTrending}
        watchlist={watchlist}
        title="Top Rated"
      />
      <Row
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Action Movies"
        fetchUrl={requesets.fetchActionMovies}
      />
      <Row
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Comedy Movies"
        fetchUrl={requesets.fetchComedyMovies}
      />
      <Row
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Horror Movies"
        fetchUrl={requesets.fetchHorrorMovies}
      />
      <Row
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Romance Movies"
        fetchUrl={requesets.fetchRomanceMovies}
      />
      <Row
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Documentaries"
        fetchUrl={requesets.fetchDocumentaries}
      />
    </div>
  );
}

export default AllMovies;
