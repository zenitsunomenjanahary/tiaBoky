import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Lecteurs from "./pages/Lecteurs";
import LecteurInfo from "./pages/LecteurInfo";
import Livres from "./pages/Livres";
import LivreInfo from "./pages/LivreInfo";
import Prets from "./pages/Prets";

function App() {
  return (
    <Router>
        <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<Lecteurs/>}/>
            <Route path="/Lecteurs" element={<Lecteurs/>}/>
            <Route path="/Lecteurs/:id" element={<LecteurInfo/>}/>
            <Route path="/Livres" element={<Livres/>}/>
            <Route path="/Livres/:id" element={<LivreInfo/>}/>
            <Route path="/Prets" element={<Prets/>}/>
          </Routes>
        </main>
    </Router>
  );
}

export default App;
