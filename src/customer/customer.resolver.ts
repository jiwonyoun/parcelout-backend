import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  CreateCustomerOutput,
} from './dtos/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Resolver((of) => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) { }

}
