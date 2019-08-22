import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Upload from "./Scenes/Upload/Upload.jsx";
import Display from "./Scenes/Display/Display.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Route exact path="/" component={Upload} />
          <Route path="/bilder" component={Display} />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
