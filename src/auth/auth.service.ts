import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: AuthDto) {
    // parola hash 'leme 
    const hash = await argon.hash(dto.password)
    console.log(hash);
    try {
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          hash
        }
      })
  
      // tekrar kullanıcıya dönülan data dan şifreyi kaldıralım
      delete user.hash
  
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("credentials taken")
        }
      }
      throw error
    }
  }

  async login(dto: AuthDto) {
    // kullanıcı veritabanından sorgulama
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email
      }
    })

    // kullanıcı yoksa hata fırlatma
    if (!user) throw new ForbiddenException("credentials incorrect")

    // kullanıcı şifre eşleştirme
    const pwMatches = await argon.verify(user.hash, dto.password)

    // şifre eşleşmemişse hata fırlatma
    if (!pwMatches) throw new ForbiddenException("credentials incorrect")

    // kullanıcıya göndermeden parolayı silme
    delete user.hash
    
    // işlemler başarılı ise kullanıcıya gönderme
    return user
  }
}
