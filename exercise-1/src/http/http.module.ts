import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateOrdersController } from './controllers/create-order.controller'
import { CreateUserController } from './controllers/create-user.controller'
import { OrdersService } from './services/orders.service'
import { UsersService } from './services/users.service'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateOrdersController, CreateUserController],
  providers: [OrdersService, UsersService],
})
export class HttpModule {}
