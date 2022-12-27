import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/login/login";
import {Registration} from "./pages/registration/registration";
import {Main} from "./pages/main/main";
import {Cart} from "./pages/cart/cart";

function App() {
   return (
       <Routes>
           <Route path="/" element={<Main/>} />
           <Route
               path="login"
               element={<Login />}
           />
           <Route path="register" element={<Registration />} />
           <Route path="cart" element={<Cart />} />
       </Routes>
  );
}

export default App;
