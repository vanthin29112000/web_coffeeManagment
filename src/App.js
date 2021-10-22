import "./App.css";
import "./Layout/GridSystem/GridSystem.css";
import HomePage from "./Container/HomePage";
import { NavBar } from "./Component/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <NavBar></NavBar>
            <HomePage></HomePage>
         </BrowserRouter>
      </div>
   );
}

export default App;
