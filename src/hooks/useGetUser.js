import {useContext, useEffect} from 'react';
import {UserContext} from "../context/userContext";
import {authService} from "../services/authService";

export const useGetUser = () => {
    const { getUser } = useContext(UserContext)
    const token = authService.getToken()

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token])
};

