import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService ) {}
    login() {
        return "I am signin in"
    }

    singup() {
        return {
            msg: "Welcome"
        }
    }
} 