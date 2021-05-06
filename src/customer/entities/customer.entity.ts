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

  // unique true 값 추가
  @Column()
  @Field(() => String)
  @IsString()
  phoneNumber: string;

  @ManyToMany(() => User, user => user.customers, { onDelete: 'CASCADE' })
  @JoinTable()
  @Field(() => [User])
  users: User[];

  @RelationId((customer: Customer) => customer.users)
  userId: number[];
}
