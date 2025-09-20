import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrderFactory } from 'test/factories/make-order'
import { UserFactory } from 'test/factories/make-user'
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/database/database.module'

describe('OrdersController (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let orderFactory: OrderFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [OrderFactory, UserFactory, JwtService],
    }).compile()

    app = moduleRef.createNestApplication()
    orderFactory = moduleRef.get(OrderFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /orders should create multiple orders with packing', async () => {
    const user = await userFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const ordersPayload = orderFactory.makeOrders(3)

    const response = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(ordersPayload)

    expect(response.status).toBe(201)
    expect(response.body.pedidos).toHaveLength(3)
  })
})
