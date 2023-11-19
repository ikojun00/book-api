import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { signInDto } from 'src/dto/sigin.dto';
import { signUpDto } from 'src/dto/signup.dto';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/services/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(signInDto: signInDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(signInDto.email);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(signUpDto: signUpDto): Promise<signUpDto> {
    const user = await this.usersService.findOne(signUpDto.email);
    if (user) {
      throw new UnauthorizedException();
    }
    return this.usersRepository.save(signUpDto);
  }
}
