import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import {
  CreateOrdersDto,
  CreateOrdersSchema,
} from '../common/create-order-schema'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { OrdersService } from '../services/orders.service'

const bodyValidationPipe = new ZodValidationPipe(CreateOrdersSchema)

@Controller('orders')
export class CreateOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(bodyValidationPipe) body: CreateOrdersDto,
    @CurrentUser() _: UserPayload
  ) {
    return this.ordersService.createMany(body.pedidos)
  }
}
