import axios from "axios"

import { authService } from "./authService"

const PUBLIC_API = "http://localhost:8083"
axios.interceptors.request.use(
    (config) => {
        const token = authService.getToken()
        if (token) {
            if (config.headers) {
               config.headers["Authorization"] = "Bearer " + token
            }
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
axios.interceptors.response.use(
    (res) => res,
    (error) => {
            if (error.response) {
                const { status, data } = error.response
                if (status === 401 && data?.message === "Unauthenticated.") {
                    authService.removeToken()
                    window.location.replace("/login")
                }
                return Promise.reject(error.response.data)
            }

            return Promise.reject(error)
    }
)
export class ApiService {
    getCurrentUrl(path) {
        return `${PUBLIC_API}${path}`
    }
    get headers() {
        return {
            headers: {
                Accept: "application/json",
            },
        }
    }
    async get(route, customHeaders = {}) {
        const url = this.getCurrentUrl(route)
        return await axios.get(url, { ...this.headers, ...customHeaders })
    }
    async post(route, data, customHeaders = {}) {
        const url = this.getCurrentUrl(route)
        return await axios.post(url, data, {
            headers: { ...this.headers.headers, ...customHeaders },
        })
    }

    async put(route, data) {
        const url = this.getCurrentUrl(route)
        return await axios.put(url, data, this.headers)
    }

    async patch(route, data) {
        const url = this.getCurrentUrl(route)
        return await axios.patch(url, data, this.headers)
    }

    async remove(route, data) {
        const url = this.getCurrentUrl(route)
        return await axios.delete(url, { ...this.headers, data })
    }
}

export const http = new ApiService()
