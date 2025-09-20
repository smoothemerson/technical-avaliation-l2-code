import { Injectable } from '@nestjs/common'
import { PedidoDto } from '../common/create-order-schema'
import { PackedBox, packProductsOptimized } from '../common/packing-algorithm'

@Injectable()
export class OrdersService {
  async createMany(pedidos: PedidoDto[]) {
    const results: { pedido_id: number; caixas: PackedBox[] }[] = []

    for (const pedido of pedidos) {
      const packing = packProductsOptimized(pedido.produtos)

      results.push({
        pedido_id: pedido.pedido_id,
        caixas: packing,
      })
    }

    return { pedidos: results }
  }
}
