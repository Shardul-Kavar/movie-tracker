import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import UsersShow from "./Pages/UsersShow";
import AdminWatchlist from "./Pages/AdminWatchlist";
import UserDashboard from "./Pages/UsersPages/UserDashboard";
import UserWatchlist from "./Pages/UsersPages/UserWatchlist";
import MoviesHome from "./Pages/UsersPages/MoviesHome";
import MoviePage from "./CommonComponents/MoviePage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/users"} element={<UsersShow />} />
        <Route path={"/mydashboard"} element={<UserDashboard />} />
        <Route path={"/mywatchlist"} element={<UserWatchlist />} />
        <Route path={"/movieslist"} element={<MoviesHome />} />
        <Route path={"/moviepage"} element={<MoviePage />} />
        <Route path={"/adminwatchlist"} element={<AdminWatchlist />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
