import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {BrowserRouter} from "react-router-dom";
import {CartContextProvider} from "./context/cartContext";
import {NotificationContextProvider} from "./context/notifiactionContext";
import {UserContextProvider} from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
    <NotificationContextProvider>
     <CartContextProvider>
       <BrowserRouter>
         <React.StrictMode>
           <App />
         </React.StrictMode>
       </BrowserRouter>
    </CartContextProvider>
    </NotificationContextProvider>
    </UserContextProvider>
);


