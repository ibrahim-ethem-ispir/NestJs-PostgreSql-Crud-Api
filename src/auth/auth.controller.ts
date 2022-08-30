import { AuthService } from './auth.service';
import { Request } from 'express';
import { Controller, Post, Req } from "@nestjs/common";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signup(@Req() req: Request ) {
        console.log(req.body);
        
        return this.authService.singup()
    }

    @Post("login")
    login() {
        return this.authService.login()
    }

}