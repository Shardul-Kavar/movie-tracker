import React, { useEffect } from "react";
import requesets from "./requests";
import Row from "./Row";

function AllMovies({
  handleWatchlist,
  bookmarkThis,
  removeBookmark,
  watchlist,
}) {
  return (
    <div>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requesets.fetchNetflixOriginals}
        isLargeRow
        handleWatchlist={handleWatchlist}
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
      />
      <Row
        handleWatchlist={handleWatchlist}
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        fetchUrl={requesets.fetchTrending}
        watchlist={watchlist}
        title="Trending Now"
      />
      <Row
        handleWatchlist={handleWatchlist}
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        fetchUrl={requesets.fetchTrending}
        watchlist={watchlist}
        title="Top Rated"
        fetchUrl={requesets.fetchTopRated}
      />
      <Row
        handleWatchlist={handleWatchlist}
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Action Movies"
        fetchUrl={requesets.fetchActionMovies}
      />
      <Row
        handleWatchlist={handleWatchlist}
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Comedy Movies"
        fetchUrl={requesets.fetchComedyMovies}
      />
      <Row
        handleWatchlist={handleWatchlist}
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Horror Movies"
        fetchUrl={requesets.fetchHorrorMovies}
      />
      <Row
        handleWatchlist={handleWatchlist}
        bookmarkThis={bookmarkThis}
        removeBookmark={removeBookmark}
        watchlist={watchlist}
        title="Romance Movies"
        fetchUrl={requesets.fetchRomanceMovies}
      />
      <Row
        handleWatchlist={handleWatchlist}
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
