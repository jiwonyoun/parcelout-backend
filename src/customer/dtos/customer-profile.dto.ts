import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/core-output.dto";
import { Customer } from "../entities/customer.entity";

@InputType()
export class CustomerProfileInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class CustomerProfileOutput extends CoreOutput {
  @Field(() => Customer, { nullable: true })
  customer?: Customer
}

@ObjectType()
export class AllCustomersOutput extends CoreOutput {
  @Field(() => [Customer], { nullable: true })
  customers?: Customer[];
}