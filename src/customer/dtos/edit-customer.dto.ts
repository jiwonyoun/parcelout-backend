import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/core-output.dto";
import { Customer } from "../entities/customer.entity";
import { CreateCustomerInput } from "./create-customer.dto";


@InputType()
export class EditCustomerInput extends PartialType(PickType(Customer, ['name', 'phoneNumber'])) {
  @Field(() => Number, { nullable: true })
  addUser?: number;

  @Field(() => Number, { nullable: true })
  exceptUser?: number;
}

@ObjectType()
export class EditCustomerOutput extends CoreOutput { }