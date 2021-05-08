import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'customers',
  'customerId',
]) { }

@ObjectType()
export class CreateAccountOutput extends CoreOutput { }
