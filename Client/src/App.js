import React from "react";
import './App.css';
import Home from './Home';
import Ent from './Ent';
import Media from './Media';
import Downloader from './YoutubeDownloader';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
 
  return (
    <Router>
        <Routes>            
          <Route exact path="/" element={<Home />}> </Route>
          <Route exact path="/Ent" element={<Ent />}> </Route>
          <Route exact path="/Media" element={<Media />}> </Route>
          <Route exact path="Downloader" element={<Downloader />}></Route>
        </Routes>
    </Router>

  );
}

// i have to add local host address to json file to hit the jsonserver"proxy":localhost address

export default App;
// #61dafb