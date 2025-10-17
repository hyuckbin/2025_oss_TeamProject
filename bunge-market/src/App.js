import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
