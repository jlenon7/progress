import { User } from '../../Models/User'
import { AppGuard } from '../../AppGuard'
import { UseGuards } from '@nestjs/common'
import { GraphQLVoid } from 'graphql-scalars'
import { CreateUserDto } from '../../Dtos/CreateUserDto'
import { UpdateUserDto } from '../../Dtos/UpdateUserDto'
import { UserService } from '../../Services/UserService'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserRepository } from '../../Repositories/UserRepository'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userRepository: UserRepository,
  ) {}

  @Query(() => [User])
  @UseGuards(AppGuard)
  public async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers()
  }

  @UseGuards(AppGuard)
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: string): Promise<User> {
    return this.userRepository.getUser(id)
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: CreateUserDto): Promise<User> {
    return this.userService.create({
      name: input.name,
      email: input.email.toLowerCase().trim(),
      password: input.password,
    })
  }

  @Mutation(() => User)
  @UseGuards(AppGuard)
  public async updateUser(
    @Context('user') user: User,
    @Args('data') input: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(user.id, {
      name: input.name,
      email: input.email.toLowerCase().trim(),
      password: input.password,
      old_password: input.old_password,
    })
  }

  @Mutation(() => GraphQLVoid)
  @UseGuards(AppGuard)
  public async deleteUser(@Args('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }
}
