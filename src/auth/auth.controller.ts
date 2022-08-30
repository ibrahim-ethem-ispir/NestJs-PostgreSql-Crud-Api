import { AuthService } from './auth.service';
import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signup() {
        return this.authService.singup()
    }

    @Post("login")
    login() {
        return this.authService.login()
    }

}