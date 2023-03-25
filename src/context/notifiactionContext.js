import React, {useState} from "react";

export const NotificationContext = React.createContext({
    notification: "",
    isError: true,
    showNotification: (message, isError) => {},
})

export const NotificationContextProvider = ({children}) => {
    const [notification, setShowNotification] = useState("")
    const [isError, setIsError] = useState(true)

    const value = {
        notification,
        isError,
        showNotification: (message, isError) => {
            setShowNotification(message)

            if(isError!== undefined){
                setIsError(isError)
            }

            setTimeout(() => {
                setShowNotification("")
                setIsError(true)
            }, 3000)
        }
    }

    return <NotificationContext.Provider value={value}>
        {children}
    </NotificationContext.Provider>
}
