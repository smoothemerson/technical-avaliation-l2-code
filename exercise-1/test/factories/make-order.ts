import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import {
  CreateOrdersDto,
  PedidoDto,
  ProdutoDto,
} from '@/http/common/create-order-schema'

export function makeProduto(override: Partial<ProdutoDto> = {}): ProdutoDto {
  return {
    produto_id: faker.commerce.productName(),
    dimensoes: {
      altura: faker.number.int({ min: 1, max: 100 }),
      largura: faker.number.int({ min: 1, max: 100 }),
      comprimento: faker.number.int({ min: 1, max: 100 }),
    },
    ...override,
  }
}

export function makePedido(override: Partial<PedidoDto> = {}): PedidoDto {
  const produtosCount = faker.number.int({ min: 1, max: 5 })
  return {
    pedido_id: faker.number.int({ min: 1, max: 1000 }),
    produtos: Array.from({ length: produtosCount }, () => makeProduto()),
    ...override,
  }
}

export function makeOrders(count = 1): CreateOrdersDto {
  return {
    pedidos: Array.from({ length: count }, () => makePedido()),
  }
}

@Injectable()
export class OrderFactory {
  makePedido(data: Partial<PedidoDto> = {}) {
    return makePedido(data)
  }

  makeOrders(count = 1) {
    return makeOrders(count)
  }
}
