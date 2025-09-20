import { ConflictException } from '@nestjs/common'
import { UseCaseError } from '@/http/common/use-case-error'

export class UserAlreadyExistsError
  extends ConflictException
  implements UseCaseError
{
  constructor(email: string) {
    super(`User with email ${email} already exists`)
  }
}
