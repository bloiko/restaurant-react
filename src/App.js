
import {Notification} from "./components/Notification/Notification";

import {DefaultRoutes} from "./defaultRoutes";
import {useGetUser} from "./hooks/useGetUser";

function App() {
    useGetUser()
   return (<>
           <DefaultRoutes/>
            <Notification/>
       </>
  );
}

export default App;
