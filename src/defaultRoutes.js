import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Main} from "./pages/main/main";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";
import {Cart} from "./pages/cart/cart";
import {Admin} from "./pages/admin/admin";
import {MyOrders} from "./pages/myOrders/MyOrders";
import {Error404} from "./pages/404/404";

export const DefaultRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route
                    path="login"
                    element={<Login />}
                />
                <Route path="register" element={<Registration />} />
                <Route path="cart" element={<Cart />} />
                <Route path="admin" element={<Admin />}/>
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
    );
};

