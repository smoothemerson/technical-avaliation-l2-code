import { Injectable } from '@nestjs/common'
import z from 'zod'
import { PrismaService } from '@/database/prisma/prisma.service'

export const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

export type CreateUser = z.infer<typeof UserSchema>

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUser) {
    return this.prisma.user.createMany({
      data: user,
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
