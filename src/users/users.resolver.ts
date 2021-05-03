import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
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
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    console.log(authUser);
    return authUser;
  }

  @Query(() => AllUsersOutput)
  findAll(): Promise<AllUsersOutput> {
    return this.usersService.findAll();
  }

  @Query(() => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Query(() => UserProfileOutput)
  userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.usersService.findById(userProfileInput);
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

  @Mutation(() => DeleteAccountOutput)
  deleteAccount(
    @Args() deleteAccountInput: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    return this.usersService.deleteAccount(deleteAccountInput);
  }
}
