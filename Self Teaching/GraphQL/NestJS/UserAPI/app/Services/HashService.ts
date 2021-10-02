import { hash, compare } from 'bcryptjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HashService {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
