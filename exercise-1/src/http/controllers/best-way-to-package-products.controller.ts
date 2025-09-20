import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt.strategy'
import { CreateOrdersSchema } from '../common/create-order-schema'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { OrdersService } from '../services/orders.service'
import { BestWayToPackageProductsDto } from './dto/best-way-to-package-products.dto'
import { Public } from '@/auth/public'

const bodyValidationPipe = new ZodValidationPipe(CreateOrdersSchema)

@Controller('orders')
@Public()
export class BestWayToPackageProductsController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(bodyValidationPipe) body: BestWayToPackageProductsDto,
    @CurrentUser() _: UserPayload
  ) {
    return this.ordersService.createMany(body.pedidos)
  }
}
