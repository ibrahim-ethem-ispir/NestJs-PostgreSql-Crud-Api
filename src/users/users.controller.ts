import { JwtGuard } from '../auth/guard/jwt.guard';
import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { Users } from '@prisma/client';

@Controller('users')
export class UsersController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: Users) {
        return user
    }

    @Patch()
    editUser() {}
} 
