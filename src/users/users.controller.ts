import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('me')
    getMe() {
        return 'user info'
    }
} 
