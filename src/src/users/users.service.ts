import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {
  }

  async findAll(): Promise<UserModel[]> {
    return await this.usersRepository.find();
  }

  async findOneBy(where: FindOptionsWhere<UserModel> | FindOptionsWhere<UserModel>[]): Promise<UserModel | null> {
    const user = await this.usersRepository.findOneBy(where);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(user: Partial<UserModel>): Promise<UserModel> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: Partial<UserModel>): Promise<UserModel> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
