import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy( 
        Strategy,
        "jwt"
    ) {
    constructor(private prisma: PrismaService) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: {
        email: string,
        sub: number
    }) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: payload.sub
            }
        })
        delete user.hash;

        return user
    }
}
