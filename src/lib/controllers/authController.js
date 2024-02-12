import authService from "../services/authService.js"

class AuthController {
    constructor() {
        if (AuthController.instance) {
            return AuthController.instance
        }
        else {
            AuthController.instance = this
        }
    }

    async signIn(email, password) {
        if (!email || !password) {
            return {
                status: 401,
                success: false,
                message: "Invalid email/password."
            }
        }
        const result = await authService.login()
        return result
    }

    async signUp(email, password) {

    }
}

const authControllerInstance = new AuthController();
export default authControllerInstance;