import {useContext} from "react";
import {NotificationContext} from "../../context/notifiactionContext";
import "./styles.css"
export const Notification = () => {
    const { notification, isError } = useContext(NotificationContext)

    return (
        <>
            {notification ? (
                <div className={`notification ${isError ? "error" : "success"}`}>
                    {notification}
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

