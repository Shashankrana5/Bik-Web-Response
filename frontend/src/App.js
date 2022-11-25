import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import User from "./pages/User"

function App() {
  return <div className="App">
    <BrowserRouter>
    <div className="pages">
      <Routes>
        <Route path = "/" element = { <Home/> }/>
        <Route path = "/users" element = { <User />} />
      </Routes>
      </div>
    </BrowserRouter>
  </div>;
}

export default App;
