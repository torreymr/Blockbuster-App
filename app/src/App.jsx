import Home from "./pages/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieOverview from "./pages/MovieOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/details/:id" Component={MovieOverview} />
      </Routes>
    </Router>
  );
}

export default App;
