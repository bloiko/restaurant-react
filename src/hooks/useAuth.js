import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import {authService} from "../services/authService";

export const useAuth = (url) => {
    const navigate = useNavigate()
    const token = authService.getToken()
    useEffect(() => {
        if (token) {
            url && navigate(url)
        } else {
            navigate("/login")
        }
    }, [token, url])
}
