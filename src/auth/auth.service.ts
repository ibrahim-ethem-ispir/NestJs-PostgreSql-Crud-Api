import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  register(dto: AuthDto) {
    return {
      msg: 'Welcome',
    };
  }

  login() {
    return 'I am signin in';
  }
}
