import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import User from '@Modules/Users/Infra/Typeorm/Entities/User'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column()
  provider_id: string

  @Column('timestamp with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Appointment
