import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User])
  async users() {
    return this.usersService.getUsers();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('name', { type: () => String }) name: string,
    @Args('designation', { type: () => String }) designation: string,
  ) {
    return this.usersService.createUser(name, designation);
  }
}

