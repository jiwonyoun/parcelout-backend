import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class EditAccountInput extends PartialType(
  OmitType(User, ['id', 'createdAt', 'updatedAt']),
) {}

@ObjectType()
export class EditAccountOutput extends CoreOutput {}
