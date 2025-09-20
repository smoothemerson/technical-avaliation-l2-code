import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '@/database/prisma/prisma.service'

export function makeUser(override: Partial<User> = {}) {
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  }
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<User> = {}): Promise<User> {
    const student = makeUser(data)

    await this.prisma.user.create({
      data: student,
    })

    return student
  }
}
