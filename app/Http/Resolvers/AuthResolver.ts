import { User } from '../../Models/User'
import { AppGuard } from '../../AppGuard'
import { UseGuards } from '@nestjs/common'
import { GraphQLVoid } from 'graphql-scalars'
import { AuthUserDto } from '../../Dtos/AuthUserDto'
import { AuthService } from '../../Services/AuthService'
import { UserService } from '../../Services/UserService'
import { AuthResponseDto } from '../../Dtos/AuthResponseDto'
import { ResetPasswordDto } from '../../Dtos/ResetPasswordDto'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Query(() => User)
  @UseGuards(AppGuard)
  public async me(@Context('user') user: User): Promise<User> {
    return user
  }

  @Mutation(() => AuthResponseDto)
  public async authUser(
    @Args('data') input: AuthUserDto,
  ): Promise<AuthResponseDto> {
    return this.authService.auth({
      email: input.email.toLowerCase().trim(),
      password: input.password,
    })
  }

  @Mutation(() => User)
  public async confirmUser(@Args('token') token: string): Promise<User> {
    return this.authService.confirm(token)
  }

  @Mutation(() => GraphQLVoid)
  public async sendForgotPassword(@Args('email') email: string): Promise<void> {
    return this.authService.forgot(email)
  }

  @Mutation(() => User)
  public async resetPassword(
    @Args('data') input: ResetPasswordDto,
  ): Promise<User> {
    return this.authService.reset(input.token, input.password)
  }
}
