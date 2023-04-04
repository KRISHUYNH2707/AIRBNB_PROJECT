import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { LoadingProvider } from "contexts/loading/LoadingContext";
import Router from "routes/Router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
