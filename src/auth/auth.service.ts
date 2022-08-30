import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    login() {
        return "I am signin in"
    }

    singup() {
        return {
            msg: "Welcome"
        }
    }
} 