import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/features/user/user.repository';
import { UserEntity } from 'src/features/user/user.entity';
import { UserCreateDto, UserUpdateDto } from 'src/features/user/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthCompleteSignUpDto, AuthLoginDto } from 'src/core/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async list(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public async get(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  public async create(user: UserCreateDto): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.userRepository.create({
        ...user,
        password: hashedPassword,
      });
      return await this.userRepository.save(newUser);
    } catch (e) {
      if (e.code === '23505') {
        throw new ForbiddenException('Email already exists');
      }
    }
  }

  public async update(
    id: string,
    user: UserUpdateDto | AuthCompleteSignUpDto,
  ): Promise<UserEntity> {
    const userToUpdate = await this.get(id);
    await this.userRepository.update(id, { ...userToUpdate, ...user });
    return this.get(id);
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async setRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<UserEntity> {
    const userToUpdate = await this.get(id);
    return this.userRepository.save({ ...userToUpdate, refreshToken });
  }

  public async findByEmailWithHidden(email: string): Promise<UserEntity> {
    return this.userRepository.findFlatByEmail(email, 'password');
  }

  public async updateLastLogin(id: string): Promise<void> {
    const userToUpdate = await this.get(id);
    this.userRepository.update(id, {
      ...userToUpdate,
      lastLoginAt: new Date().toISOString(),
    });
  }

  public async partialSignUp(user: AuthLoginDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
}
