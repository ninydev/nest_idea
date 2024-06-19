import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserModel } from '../users/user.entity';
import { AuthRegisterDto } from './dto/auth-register.dto';
import {EventService} from "../events/event.service";
import {UserRegisteredEvent} from "./events/user-registered.event";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private eventService: EventService
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneBy({ email });

    this.eventService.emitEvent('user.registered', new UserRegisteredEvent(user));

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { name: user.name, email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: AuthRegisterDto): Promise<UserModel> {
    const newUser = await this.usersService.create({
      ...signUpDto,
    });
    delete newUser.password;
    return newUser;
  }
}
