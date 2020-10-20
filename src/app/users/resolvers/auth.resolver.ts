import AuthGuard from '../auth.guard'
import User from '../models/user.entity'
import { UseGuards } from '@nestjs/common'
import AuthUserDto from './dto/auth.user.dto'
import AuthResponse from './responses/auth.response'
import AuthUserService from '../services/auth.user.service'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
export default class AuthResolver {
  constructor(private authUserService: AuthUserService) {}

  @Query(() => User)
  @UseGuards(new AuthGuard())
  public async me(@Context('user') user: User): Promise<User> {
    return user
  }

  @Mutation(() => AuthResponse)
  public async authUser(
    @Args('data') input: AuthUserDto,
  ): Promise<AuthResponse> {
    return this.authUserService.execute({
      email: input.email.toLowerCase().trim(),
      password: input.password,
    })
  }
}
