import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {BrowserRouter} from "react-router-dom";
import {CartContextProvider} from "./context/cartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartContextProvider>
       <BrowserRouter>
         <React.StrictMode>
           <App />
         </React.StrictMode>
       </BrowserRouter>
    </CartContextProvider>
);


