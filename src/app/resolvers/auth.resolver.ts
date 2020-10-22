import AuthGuard from '../auth.guard'
import User from '../models/user.entity'
import { UseGuards } from '@nestjs/common'
import { GraphQLVoid } from 'graphql-scalars'
import AuthUserDto from './dto/auth.user.dto'
import AuthResponse from './responses/auth.response'
import ResetPasswordDto from './dto/change.password.dto'
import AuthUserService from '../services/auth.user.service'
import ConfirmUserService from '../services/confirm.user.service'
import SendForgotUserService from '../services/send.forgot.user.service'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import ResetPasswordUserService from '../services/reset.password.user.service'

@Resolver(() => User)
export default class AuthResolver {
  constructor(
    private authUserService: AuthUserService,
    private confirmUserService: ConfirmUserService,
    private sendForgotUserService: SendForgotUserService,
    private resetPasswordUserService: ResetPasswordUserService,
  ) {}

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

  @Mutation(() => User)
  public async confirmUser(@Args('token') token: string): Promise<User> {
    return this.confirmUserService.execute(token)
  }

  @Mutation(() => GraphQLVoid)
  public async sendForgotPassword(@Args('email') email: string): Promise<void> {
    return this.sendForgotUserService.execute(email)
  }

  @Mutation(() => User)
  public async resetPassword(
    @Args('data') input: ResetPasswordDto,
  ): Promise<User> {
    return this.resetPasswordUserService.execute(input.token, input.password)
  }
}
