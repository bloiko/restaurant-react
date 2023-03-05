import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";
import {Main} from "./pages/main/main";
import {Cart} from "./pages/cart/cart";
import {Admin} from "./pages/admin/admin";
import {Notification} from "./components/Notification/Notification";
import {MyOrders} from "./pages/myOrders/MyOrders";

import {useGetUser} from "./hooks/useGetUser";

function App() {
    useGetUser()

   return (<>
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
       </Routes>
   <Notification/>
       </>
  );
}

export default App;
