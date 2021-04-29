import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditAccountInput, EditAccountOutput } from './dtos/edit-account.dto';
import { AllUsersOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  me() {
    return 'hi';
  }

  @Query(() => AllUsersOutput)
  findAll(): Promise<AllUsersOutput> {
    return this.usersService.findAll();
  }

  @Mutation(() => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(() => EditAccountOutput)
  editAccount(
    @Args('id') id: number,
    @Args('input') editAccountInput: EditAccountInput,
  ): Promise<EditAccountOutput> {
    return this.usersService.editAccount(id, editAccountInput);
  }
}
