import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';

@ArgsType()
export class DeleteAccountInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class DeleteAccountOutput extends CoreOutput {}
