const TOKEN = "restaurant-token"

class AuthService {
    setToken(token) {
        localStorage.setItem(TOKEN, token)
    }

    getToken() {
        if (typeof window !== "undefined") {
            return localStorage.getItem(TOKEN)
        } else {
            return ""
        }
    }

    removeToken() {
        localStorage.removeItem(TOKEN)
    }
}

export const authService = new AuthService()
