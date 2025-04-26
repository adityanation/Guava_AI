import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import UploadPage from "./components/UploadPage";
import GuavaGamePage from "./components/GuavaGamePage";
import ArticlesPage from "./components/ArticlesPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/game" element={<GuavaGamePage />} />
        <Route path="/article" element={<ArticlesPage />} />
      </Routes>
    </Router>
  );
}

