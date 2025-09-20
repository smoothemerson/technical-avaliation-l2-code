import { z } from 'zod'

export const DimensoesSchema = z.object({
  altura: z.number().positive(),
  largura: z.number().positive(),
  comprimento: z.number().positive(),
})

export const ProdutoSchema = z.object({
  produto_id: z.string(),
  dimensoes: DimensoesSchema,
})

export const PedidoSchema = z.object({
  pedido_id: z.number(),
  produtos: z.array(ProdutoSchema),
})

export const CreateOrdersSchema = z.object({
  pedidos: z.array(PedidoSchema),
})

export type DimensoesDto = z.infer<typeof DimensoesSchema>
export type ProdutoDto = z.infer<typeof ProdutoSchema>
export type PedidoDto = z.infer<typeof PedidoSchema>
export type CreateOrdersDto = z.infer<typeof CreateOrdersSchema>
