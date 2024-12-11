import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos';
import * as fs from 'fs/promises';
import { v4 as uuid } from 'uuid';

const filePath = 'src/data/users.json';

@Injectable()
export class UserService {
  private async readUsers(): Promise<any[]> {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data) as any[];
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async writeUsers(users: any[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
  }

  async create(createUserDto: CreateUserDto) {
    const users = await this.readUsers();

    if (users.find((user) => user.username === createUserDto.username))
      throw new ConflictException('User already exists');

    const newUser = { ...createUserDto, isPremium: false, id: uuid() };

    users.push(newUser);

    await this.writeUsers(users);

    return { user: newUser };
  }

  async findAll() {
    const users = await this.readUsers();
    return { users };
  }

  async findOneById(id: string) {
    const users = await this.readUsers();

    const user = users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return { user };
  }

  async remove(id: string) {
    const users = await this.readUsers();

    const user = users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    const updatedUsers = users.filter((user) => user.id !== id);

    await this.writeUsers(updatedUsers);

    return { message: 'User deleted successfully' };
  }
}
