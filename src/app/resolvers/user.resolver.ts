import AuthGuard from '../auth.guard'
import User from '../models/user.entity'
import { UseGuards } from '@nestjs/common'
import { GraphQLVoid } from 'graphql-scalars'
import CreateUserDto from './dto/create.user.dto'
import UpdateUserDto from './dto/update.user.dto'
import UserRepository from '../repositories/user.repository'
import CreateUserService from '../services/create.user.service'
import UpdateUserService from '../services/update.user.service'
import DeleteUserService from '../services/delete.user.service'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
export default class UserResolver {
  constructor(
    private userRepository: UserRepository,
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
  ) {}

  @Query(() => [User])
  @UseGuards(new AuthGuard())
  public async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers()
  }

  @UseGuards(new AuthGuard())
  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: string): Promise<User> {
    return this.userRepository.getUser(id)
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: CreateUserDto): Promise<User> {
    return this.createUserService.execute({
      name: input.name,
      email: input.email.toLowerCase().trim(),
      password: input.password,
    })
  }

  @Mutation(() => User)
  @UseGuards(new AuthGuard())
  public async updateUser(
    @Args('id') id: string,
    @Args('data') input: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserService.execute(id, {
      name: input.name,
      email: input.email.toLowerCase().trim(),
      password: input.password,
      old_password: input.old_password,
    })
  }

  @Mutation(() => GraphQLVoid)
  @UseGuards(new AuthGuard())
  public async deleteUser(@Args('id') id: string): Promise<void> {
    return this.deleteUserService.execute(id)
  }
}
