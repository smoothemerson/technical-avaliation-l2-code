import { ApiProperty } from '@nestjs/swagger'

export class BestWayToPackageProductsDto {
  @ApiProperty({
    example: [
      {
        pedido_id: 1,
        produtos: [
          {
            produto_id: 'A1',
            dimensoes: {
              altura: 10,
              largura: 20,
              comprimento: 15,
            },
          },
          {
            produto_id: 'B2',
            dimensoes: {
              altura: 5,
              largura: 5,
              comprimento: 5,
            },
          },
        ],
      },
      {
        pedido_id: 2,
        produtos: [
          {
            produto_id: 'C3',
            dimensoes: {
              altura: 8,
              largura: 12,
              comprimento: 10,
            },
          },
        ],
      },
    ],
    description: 'Lista de pedidos com produtos e suas dimensões',
  })
  pedidos!: {
    pedido_id: number
    produtos: {
      produto_id: string
      dimensoes: {
        altura: number
        largura: number
        comprimento: number
      }
    }[]
  }[]
}
