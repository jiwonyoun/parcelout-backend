import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { Customer } from '../entities/customer.entity';

@InputType()
export class CreateCustomerInput extends OmitType(Customer, [
  'id',
  'createdAt',
  'updatedAt',
  'users',
]) {
  @Field(() => Int)
  builderId: number;
}

@ObjectType()
export class CreateCustomerOutput extends CoreOutput { }
