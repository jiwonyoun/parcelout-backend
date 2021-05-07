import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteAccountOutput } from 'src/users/dtos/delete-account.dto';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  CreateCustomerOutput,
} from './dtos/create-customer.dto';
import { AllCustomersOutput, CustomerProfileOutput } from './dtos/customer-profile.dto';
import { DeleteCustomerOutput } from './dtos/delete-customer.dto';
import { EditCustomerInput, EditCustomerOutput } from './dtos/edit-customer.dto';
import { Customer } from './entities/customer.entity';

@Resolver((of) => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) { }

  @Query(() => AllCustomersOutput)
  findAllCustomers(): Promise<AllCustomersOutput> {
    return this.customerService.findAllCustomers();
  }

  @Query(() => CustomerProfileOutput)
  findCustomerById(@Args('id') id: number): Promise<CustomerProfileOutput> {
    return this.customerService.findCustomerById(id);
  }

  @Mutation(() => CreateCustomerOutput)
  createCustomer(@Args('input') createCustomerInput: CreateCustomerInput): Promise<CreateCustomerOutput> {
    return this.customerService.createCustomer(createCustomerInput);
  }

  @Mutation(() => EditCustomerOutput)
  editCustomer(@Args('id') id: number, @Args('input') editCustomerInput: EditCustomerInput): Promise<EditCustomerOutput> {
    return this.customerService.editCustomer(id, editCustomerInput);
  }

  @Mutation(() => DeleteCustomerOutput)
  deleteCustomer(@Args('id') id: number): Promise<DeleteAccountOutput> {
    return this.customerService.deleteCustomer(id);
  }
}
