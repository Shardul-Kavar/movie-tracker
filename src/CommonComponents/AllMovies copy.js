import React from "react";
import requesets from "./requests";
import Row from "./Row";

function AllMovies() {
  return (
    <div>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requesets.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requesets.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requesets.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requesets.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requesets.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requesets.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requesets.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requesets.fetchDocumentaries} />
    </div>
  );
}

export default AllMovies;
