import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { Public } from '@/auth/public'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserAlreadyExistsError } from './errors/user-already-exists'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

@Controller('/users')
@Public()
export class CreateUserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserDto) {
    const { name, email, password } = body

    const emailExists = await this.usersService.findByEmail(email)

    if (emailExists) {
      throw new UserAlreadyExistsError(email)
    }

    await this.usersService.create({
      name,
      email,
      password,
    })
  }
}
