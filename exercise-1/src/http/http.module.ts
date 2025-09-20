import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { BestWayToPackageProductsController } from './controllers/best-way-to-package-products.controller'
import { CreateUserController } from './controllers/create-user.controller'
import { OrdersService } from './services/orders.service'
import { UsersService } from './services/users.service'

@Module({
  imports: [DatabaseModule],
  controllers: [BestWayToPackageProductsController, CreateUserController],
  providers: [OrdersService, UsersService],
})
export class HttpModule {}
