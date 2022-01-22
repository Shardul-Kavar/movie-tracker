import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import UsersShow from "./Pages/UsersShow";
import MoviesHome from "./Pages/MoviesHome";
import MoviePage from "./Pages/MoviePage";
import Watchlist from "./Pages/Watchlist";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/users"} element={<UsersShow />} />
        <Route path={"/watchlist"} element={<Watchlist />} />
        <Route path={"/movieslist"} element={<MoviesHome />} />
        <Route path={"/moviepage"} element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
