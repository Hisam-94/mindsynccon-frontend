import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // React Router
import { Provider } from "react-redux"; // Redux Provider
import  { persistor, store } from "./app/store";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Redux Provider */}
      <BrowserRouter>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          {/* React Router */}
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
