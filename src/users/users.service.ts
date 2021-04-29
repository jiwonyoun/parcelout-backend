import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditAccountInput, EditAccountOutput } from './dtos/edit-account.dto';
import { AllUsersOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async findAll(): Promise<AllUsersOutput> {
    try {
      const users = await this.users.find();
      if (!users) {
        return {
          ok: false,
          error: 'Users not found',
        };
      }
      return {
        ok: true,
        users,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not load users',
      };
    }
  }

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const user = await this.users.create(createAccountInput);
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create account',
      };
    }
  }

  async editAccount(
    id: number,
    { name, phoneNumber, password }: EditAccountInput,
  ): Promise<EditAccountOutput> {
    try {
      const user = await this.users.findOne(id);
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      if (name) {
        user.name = name;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (password) {
        user.password = password;
      }

      await this.users.save(user);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not edit account',
      };
    }
  }
}
