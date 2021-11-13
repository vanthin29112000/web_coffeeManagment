import "./App.css";
import "./Layout/GridSystem/GridSystem.css";
import HomePage from "./Container/HomePage";
import { BrowserRouter } from "react-router-dom";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <HomePage></HomePage>
         </BrowserRouter>
      </div>
   );
}

export default App;
