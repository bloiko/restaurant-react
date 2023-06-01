import React, {useState} from "react";
import {http} from "../services/apiService";

const getCurrentUser = () => http.get("/user/profile")

export const UserContext = React.createContext({
    user: null,
    getUser: () => {},
    removeUser: () => {}
})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const value = {
         user,
        getUser: async () => {
            const {data} = await getCurrentUser()
            setUser(data)
        },
        removeUser: async () => {
            setUser(null)
        }
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}
