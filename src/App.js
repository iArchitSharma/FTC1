import './App.css';
import {useEffect, useState} from "react"
import {BrowserRouter, Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import MapPage from "./pages/MapPage"

function App() {
  const [scriptChat, setScriptChat] = useState(null)
  // useEffect(() => {
  //   let script = document.createElement('script');
  
  //   script.src = "//code.tidio.co/nhuphmpdblrzojf9nurdau7buw4e59rg.js";
  //   script.async = true;
  
  //   document.body.appendChild(script);
  //   setScriptChat(script)
  //   console.log("script", script)
  // }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path = "/" > 
          <LandingPage /> 
        </Route>

        <Route exact path = "/map" > 
          <MapPage script = {scriptChat}/> 
        </Route>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
