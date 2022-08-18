import "./App.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Update from "./Update";
import Formdata from "./Formdata";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Formdata />} />
        <Route path="update" element={<Update />} />
      </Routes>
    </div>
  );
};

export default App;
