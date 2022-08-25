import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Formdata from "./Formdata";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Formdata />} />
      </Routes>
    </div>
  );
};

export default App;
