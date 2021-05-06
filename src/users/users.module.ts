import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerResolver } from 'src/customer/customer.resolver';
import { CustomerService } from 'src/customer/customer.service';
import { Customer } from 'src/customer/entities/customer.entity';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer])],
  providers: [UsersResolver, UsersService, CustomerService, CustomerResolver],
  exports: [UsersService],
})
export class UsersModule { }
