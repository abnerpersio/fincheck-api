import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UserPrismaRepository } from '~database/repositories/user.prisma.repository';
import { env } from '~infra/config/env';
import { SignupDTO } from './dto/signup.dto';
import { SiginDTO } from './dto/singin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: UserPrismaRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: SignupDTO) {
    const { name, email, password } = data;

    const isAlreadyRegistered = await this.repo.findByEmail(email);

    if (!!isAlreadyRegistered) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await hash(password, env.passwordSaltLength);

    const user = await this.repo.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await this.repo.createCategories(user.id, [
      { name: 'Salário', icon: 'salary', type: 'INCOME' },
      { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
      { name: 'Outro', icon: 'other', type: 'INCOME' },
      { name: 'Casa', icon: 'home', type: 'EXPENSE' },
      { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
      { name: 'Educação', icon: 'education', type: 'EXPENSE' },
      { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
      { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
      { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
      { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
      { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
      { name: 'Outro', icon: 'other', type: 'EXPENSE' },
    ]);

    return { token: await this.generateAccessToken(user.id) };
  }

  async signin(data: SiginDTO) {
    const { email, password } = data;
    const user = await this.repo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { token: await this.generateAccessToken(user.id) };
  }

  private async generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
