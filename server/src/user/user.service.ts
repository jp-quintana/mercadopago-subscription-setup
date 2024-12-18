import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos';
import * as fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { LoginDto } from './dtos/login.dto';
import { UserRole } from './interfaces/user.interface';

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

    let newUser = { ...createUserDto, role: UserRole.USER, id: uuid() };

    users.push(newUser);

    await this.writeUsers(users);

    delete newUser.password;
    delete newUser.confirmPassword;

    return { user: newUser };
  }

  async login(loginDto: LoginDto) {
    const users = await this.readUsers();

    const user = users.find((user) => user.username === loginDto.username);

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== loginDto.password)
      throw new UnauthorizedException('Invalid credentials');

    return { user };
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

  async findOneByUsername(username: string) {
    const users = await this.readUsers();

    const user = users.find((user) => user.username === username);

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
