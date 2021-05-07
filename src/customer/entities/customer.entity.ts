import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';

@InputType('CustomerInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Customer extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  @IsString()
  phoneNumber: string;

  @ManyToMany(() => User, user => user.customers)
  @JoinTable()
  @Field(() => [User], { nullable: true })
  users?: User[];

  @RelationId((customer: Customer) => customer.users)
  @Field(() => [Number], { nullable: true })
  userId?: number[];
}
