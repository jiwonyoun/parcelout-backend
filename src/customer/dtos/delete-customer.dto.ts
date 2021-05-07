import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/core-output.dto";

@InputType()
export class DeleteCustomerInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class DeleteCustomerOutput extends CoreOutput { }