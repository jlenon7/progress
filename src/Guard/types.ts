import { RoleEnum } from './enums'

export interface IGuard {
  parse(token: string): Promise<void>
  isUser(): boolean
  isAdmin(): boolean
  getRoles(): RoleEnum[]
  hasRole(role: RoleEnum): boolean
  check(): boolean
}
