import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import { hash } from 'bcryptjs'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null
  }

  @BeforeInsert()
  async modifyPassword(): Promise<void> {
    const hashedPassword = await hash(this.password, 8)
    this.password = hashedPassword
  }
}

export default User
