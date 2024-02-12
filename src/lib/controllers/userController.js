import { getUserMoviesService, handlePasswordChangeService, handleEmailChangeService, handleDeleteService } from "../services/userService.js"
class UserController {
    constructor() {
        if (UserController.instance) {
            return UserController.instance
        }
        else {
            UserController.instance = this
        }
    }

    async getUserMoviesController(token) {
        const result = await getUserMoviesService(token)
        return result
    }

    async handlePasswordChangeController(token, password, newPassword, confirmPassword) {
        if (!password || !newPassword || !confirmPassword) return {
            responseCode: 400,
            result: {
                message: "All fields are required!"
            }
        }
        if (newPassword.length < 4 || newPassword !== confirmPassword) return {
            responseCode: 400,
            result: {
                message: "Password length needs to be at least 4/passwords don't match!"
            }
        }
        const result = await handlePasswordChangeService(token, password, newPassword, confirmPassword)
        return result
    }

    async handleEmailChangeController(token, email) {
        if (!email) return {
            responseCode: 400,
            result: {
                message: "Email is required!"
            }
        }
        const result = await handleEmailChangeService(token, email)
        return result
    }

    async handleDeleteController(token) {
        const result = await handleDeleteService(token)
        return result
    }
}

const userControllerInstance = new UserController();
export default userControllerInstance;