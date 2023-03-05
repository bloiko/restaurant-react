import React, {useContext, useEffect} from 'react';
import {UserContext} from "../context/userContext";
import {authService} from "../services/authService";
import {useNavigate} from "react-router-dom";

export const useGetUser = () => {
    const { getUser } = useContext(UserContext)
    const token = authService.getToken()
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            getUser()
        }

        if (!token) {
            navigate("/login")
        }
    }, [token])
};

