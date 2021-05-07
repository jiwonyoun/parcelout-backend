import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dtos/delete-account.dto';
import { EditAccountInput, EditAccountOutput } from './dtos/edit-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  AllUsersOutput,
  UserProfileInput,
  UserProfileOutput,
} from './dtos/user-profile.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly configServce: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  async findAllUsers(): Promise<AllUsersOutput> {
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

  async findUserById({ id }: UserProfileInput): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail(id);
      return {
        ok: true,
        user,
      };
    } catch {
      return {
        ok: false,
        error: 'User not found',
      };
    }
  }

  async login({ name, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { name },
        { select: ['id', 'name', 'password'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      const token = await this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const user = await this.users.findOne({ name: createAccountInput.name });
      if (user) {
        return {
          ok: false,
          error: `${createAccountInput.name} is already exists`,
        };
      }
      await this.users.save(await this.users.create(createAccountInput));
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

      await this.users.save({ ...user });
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

  async deleteAccount({
    id,
  }: DeleteAccountInput): Promise<DeleteAccountOutput> {
    try {
      const exists = await this.users.findOne(id);
      if (!exists) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      await this.users.delete(id);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete account',
      };
    }
  }

}
