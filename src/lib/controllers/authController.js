import { signUpService, signInService } from "../services/authService.js"
class AuthController {
    constructor() {
        if (AuthController.instance) {
            return AuthController.instance
        }
        else {
            AuthController.instance = this
        }
    }

    async signInController(email, password) {
        const result = await signInService(email, password)
        return result

    }

    async signUpController(email, password) {
        const result = await signUpService(email, password)
        return result
    }
}

const authControllerInstance = new AuthController();
export default authControllerInstance;