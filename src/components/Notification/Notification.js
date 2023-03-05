import {useContext} from "react";
import {NotificationContext} from "../../context/notifiactionContext";
import "./styles.css"
export const Notification = () => {
    const { notification } = useContext(NotificationContext)
    console.log(notification)
    return (
        <>
            {notification ? (
                <div className="notification">
                    {notification}
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

