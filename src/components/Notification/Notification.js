import {useContext} from "react";
import {NotificationContext} from "../../context/notifiactionContext";
import "./styles.css"
export const Notification = () => {
    const { notification } = useContext(NotificationContext)

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

