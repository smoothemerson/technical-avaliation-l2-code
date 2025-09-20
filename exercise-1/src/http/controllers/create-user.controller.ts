import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { Public } from '@/auth/public'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UsersService } from '../services/users.service'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/users')
@Public()
export class CreateUserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBodySchema) {
    const { name, email, password } = body

    await this.usersService.create({
      name,
      email,
      password,
    })
  }
}
