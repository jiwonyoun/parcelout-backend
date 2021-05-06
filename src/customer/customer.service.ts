import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuleTester } from 'eslint';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCustomerInput, CreateCustomerOutput } from './dtos/create-customer.dto';
import { EditCustomerInput, EditCustomerOutput } from './dtos/edit-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customers: Repository<Customer>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) { }

  async createCustomer({ builderId, name, phoneNumber }: CreateCustomerInput): Promise<CreateCustomerOutput> {
    try {
      let customer = await this.customers.findOne({ phoneNumber });
      if (customer) {
        return {
          ok: false,
          error: `${customer.phoneNumber} already exists.`,
        }
      }

      const user = await this.users.findOne(builderId);
      if (!user) {
        return {
          ok: false,
          error: 'Builder not found',
        }
      }
      customer = await this.customers.create({ name, phoneNumber });
      customer.users = [];
      customer.users.push(user);
      await this.customers.save(customer);
      return {
        ok: true,
      }
    } catch {
      return {
        ok: false,
        error: 'Could not create customer'
      }
    }
  }

  async editCustomer(id: number, { addUser, exceptUser, name, phoneNumber }: EditCustomerInput): Promise<EditCustomerOutput> {
    try {
      const customer = await this.customers.findOne(id, { relations: ['users'] });
      if (!customer) {
        return {
          ok: false,
          error: 'Customer not found',
        }
      }

      if (addUser) {
        const user = await this.users.findOneOrFail(addUser);

        if (customer.userId.includes(user.id)) {
          return {
            ok: false,
            error: 'Customer already registered',
          }
        } else {
          customer.users.push(user);
        }
      }

      if (exceptUser) {
        const findUser = await this.users.findOneOrFail(exceptUser, { relations: ['customers'] });
        if (customer.userId.includes(findUser.id)) {
          customer.users = customer.users.filter((user) => user.id !== findUser.id);
        } else {
          return {
            ok: false,
            error: 'Customer not registered',
          }
        }
      }

      if (name) {
        customer.name = name;
      }

      if (phoneNumber) {
        customer.phoneNumber = phoneNumber;
      }

      await this.customers.save(customer);
      return {
        ok: true,
      }

    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'Could not edit customer'
      }
    }
  }
}