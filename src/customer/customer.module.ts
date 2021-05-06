import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User])],
  providers: [CustomerService, UsersService],
  exports: [CustomerService],
})
export class CustomerModule { }
