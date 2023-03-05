import React, {useState} from "react";

export const NotificationContext = React.createContext({
    notification: "",
    showNotification: (message) => {},
})

export const NotificationContextProvider = ({children}) => {
    const [notification, setShowNotification] = useState("")

    const value = {
        notification,
        showNotification: (message) => {
            setShowNotification(message)
            setTimeout(() => setShowNotification(""), 3000)
        }
    }

    return <NotificationContext.Provider value={value}>
        {children}
    </NotificationContext.Provider>
}
